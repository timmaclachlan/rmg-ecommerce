import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        useFlatConfig: true, // ✅ tells checker to use ESLint v9 format
        lintCommand: 'eslint "./src/**/*.{js,jsx}"',
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
