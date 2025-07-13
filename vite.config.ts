import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "C369 Fitness",
        short_name: "C369",
        description: "Your Ultimate Fitness Partner",
        theme_color: "#CC0000",
        background_color: "#1A1A1A",
        display: "standalone",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot-home.jpg",
            sizes: "375x667",
            type: "image/jpeg",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
