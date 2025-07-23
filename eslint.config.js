import js from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
});

export default [
  js.configs.recommended,

  // Optional: legacy compatibility
  ...compat.config({
    plugins: ["react"],
    extends: ["plugin:react/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
  }),

  // ✅ Direct plugin usage for Flat Config
  {
    plugins: {
      react: eslintPluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ Enables JSX parsing
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": ["error", { allowGlobals: false }], // ✅ This catches <Routettt>
      "react/jsx-uses-vars": "error",
      "react/jsx-no-duplicate-props": "error",
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },
];
