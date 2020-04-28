const path = require("path");

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  extends: ["../../.eslintrc.js", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", "src/serviceWorker.ts"],
};
