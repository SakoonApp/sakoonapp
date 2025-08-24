
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
          manifest: {
            "name": "SakoonApp",
            "short_name": "Sakoon",
            "description": "एक मानसिक शांति और भावनात्मक सपोर्ट ऐप, जहाँ आप सुनने वाले लोगों से बात कर सकते हैं, गुमनाम रूप से। अकेलापन दूर करें और सकून पाएं।",
            "theme_color": "#0891B2",
            "background_color": "#ffffff",
            "display": "standalone",
            "scope": "/",
            "start_url": "/",
            "icons": [
              {
                "src": "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop",
                "sizes": "192x192",
                "type": "image/jpeg"
              },
              {
                "src": "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&fit=crop",
                "sizes": "512x512",
                "type": "image/jpeg",
                "purpose": "any maskable"
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg}']
          }
        })
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('.', import.meta.url))
        }
      }
    };
});
