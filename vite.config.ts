import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: "To Do Application",
      short_name: "ToDo App",
      description: "Application for users managing their todos",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/icon-192x192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any",
        },
        {
        src: "/icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
        }
      ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
  })],
})
