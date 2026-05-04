import { defineConfig } from "vite";

export default defineConfig({
  base: "/The-Library/",
  publicDir: false,
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        codeSplitting: false,
        entryFileNames: "app.js",
        chunkFileNames: "app.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
