import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Match JavaScript files
    languageOptions: {
      globals: globals.browser, // Include browser globals like `window`, `document`
      parserOptions: {
        ecmaVersion: 2021, // Use modern ECMAScript features
        sourceType: "module", // Allow ES module imports
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Include JavaScript recommended rules
      ...pluginReact.configs.flat.recommended.rules, // Include React recommended rules
      "react/react-in-jsx-scope": "off", // Disable React in scope rule (React 17+)
    },
  },
];
