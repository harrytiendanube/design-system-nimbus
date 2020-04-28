module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Promise: true,
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
  ],
};
