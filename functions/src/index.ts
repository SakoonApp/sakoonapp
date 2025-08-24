
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import {RtcTokenBuilder, RtcRole} from "zego-express-engine";
import Razorpay from "razorpay";
import * as crypto from "crypto";

admin.initializeApp();
const db = admin.firestore();

// Declaration merging to add 'user' to Express Request
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

/**
 * Creates a stable 32-bit unsigned integer from a string UID.
 * Zego User IDs must be 32-bit unsigned integers and cannot be 0.
 * @param {string} uid The Firebase user UID string.
 * @return {number} A 32-bit unsigned integer for Zego.
 */
const firebaseUIDtoZegoUID = (uid: string): number => {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    const char = uid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  // Zego User ID must be a 32-bit unsigned integer and cannot be 0.
  const uHash = hash >>> 0;
  return uHash === 0 ? 1 : uHash;
};


const app = express();
app.use(cors({origin: true}));
app.use(express.json());


// Middleware to check Firebase Auth token
const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).send("Unauthorized");
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    return res.status(403).send("Unauthorized");
  }
};

// Zego Token Generation Endpoint
app.post("/generateZegoToken", authenticate, async (req: express.Request, res: express.Response) => {
  const userId = req.user!.uid;
  const {planId} = req.body;

  if (!planId) {
    return res.status(400).send({error: "Plan ID is required."});
  }

  try {
    const planDoc = await db
      .collection("users")
      .doc(userId)
      .collection("purchasedPlans")
      .doc(planId)
      .get();

    if (!planDoc.exists) {
      return res.status(404).send({error: "Plan not found."});
    }

    const planData = planDoc.data();
    if (!planData || planData.remainingSeconds <= 0) {
      return res.status(403).send({error: "No time remaining on this plan."});
    }

    const appID = parseInt(functions.config().zego.app_id, 10);
    const serverSecret = functions.config().zego.server_secret;
    const effectiveTimeInSeconds = 3600; // Token valid for 1 hour
    const payload = "";

    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      serverSecret,
      planId, // Use a unique channel/room ID
      firebaseUIDtoZegoUID(userId), // Zego User ID must be a number
      RtcRole.PUBLISHER,
      effectiveTimeInSeconds,
      payload,
    );

    return res.status(200).send({token});
  } catch (error) {
    console.error("Error generating Zego token:", error);
    return res.status(500).send({error: "Could not generate session token."});
  }
});

// Razorpay Webhook Endpoint
app.post("/razorpayWebhook", async (req: express.Request, res: express.Response) => {
  const secret = functions.config().razorpay.webhook_secret;
  const signature = req.headers["x-razorpay-signature"] as string;

  try {
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;
    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;
      const {
        userId,
        planDuration,
        planPrice,
        planType,
        planId,
        purchaseType,
        tokensToBuy,
      } = payment.notes;

      if (!userId) {
        console.error("User ID missing in payment notes");
        return res.status(400).send("User ID is missing.");
      }
      
      if (purchaseType === "tokens") {
        const tokens = parseInt(tokensToBuy, 10);
        if (isNaN(tokens) || tokens <= 0) {
          console.error("Invalid tokensToBuy value:", tokensToBuy);
          return res.status(400).send("Invalid token amount.");
        }
        const userRef = db.collection("users").doc(userId);
        try {
          await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
              transaction.set(userRef, {tokenBalance: tokens});
            } else {
              transaction.update(userRef, {
                tokenBalance: admin.firestore.FieldValue.increment(tokens),
              });
            }
          });
          await userRef.collection("tokenTransactions").add({
            tokensAdded: tokens,
            pricePaid: payment.amount / 100,
            razorpayPaymentId: payment.id,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`Successfully added ${tokens} tokens to user ${userId}`);
        } catch (e) {
          console.error("Token purchase transaction failed:", e);
        }
      } else {
        // If it's a daily deal, handle the counter
        if (planId === "daily_deal") {
          const todayStr = new Date(Date.now() + (5.5 * 60 * 60 * 1000))
            .toISOString().split("T")[0];
          const dealRef = db.collection("dailyDeals").doc(todayStr);
          try {
            await db.runTransaction(async (transaction) => {
              const dealDoc = await transaction.get(dealRef);
              const currentCount = dealDoc.exists ? (dealDoc.data()!.count || 0) : 0;
              transaction.set(dealRef, {count: currentCount + 1}, {merge: true});
            });
          } catch (e) {
            console.error("Daily deal transaction failed: ", e);
          }
        }

        const parseDurationToSeconds = (duration: string): number => {
          const amount = parseInt(duration, 10) || 0;
          if (duration.includes("मिनट")) {
            return amount * 60;
          } else if (duration.includes("घंटा")) {
            return amount * 3600;
          }
          return 0;
        };

        const purchaseTimestamp = Date.now();
        const remainingSeconds = parseDurationToSeconds(planDuration);
        const expiryTimestamp = purchaseTimestamp + 7 * 24 * 60 * 60 * 1000;

        let validFromTimestamp = null;
        if (planId === "daily_deal") {
          const activationDate = new Date();
          activationDate.setHours(23, 0, 0, 0);
          validFromTimestamp = activationDate.getTime();
        }

        const newPlan = {
          type: planType,
          plan: {
            duration: planDuration,
            price: parseFloat(planPrice),
          },
          purchaseTimestamp,
          expiryTimestamp,
          remainingSeconds,
          totalSeconds: remainingSeconds,
          listenerId: null,
          razorpayPaymentId: payment.id,
          ...(planId && {planId}),
          ...(validFromTimestamp && {validFromTimestamp}),
        };

        await db
          .collection("users")
          .doc(userId)
          .collection("purchasedPlans")
          .add(newPlan);
      }
    }

    return res.status(200).send({status: "success"});
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export const api = functions.region("asia-south1").https.onRequest(app);
