import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        useFlatConfig: true,
        lintCommand: "eslint src --ext .js,.jsx",
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
