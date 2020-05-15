module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Promise: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  extends: [
    "standard",
    "standard-react",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/standard",
    "prettier/react",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
}
