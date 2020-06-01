module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Promise: true,
  },
  plugins: ["prettier", "spellcheck"],
  rules: {
    "prettier/prettier": "error",
    "spellcheck/spell-checker": [
      "error",
      {
        lang: "en_US",
        skipWords: [
          "dict",
          "aff",
          "SvgrComponent",
          "classname",
          "svg",
          "utils",
          "Svgr",
          "wrapgrid",
          "href",
          "dismissable",
        ],
        skipIfMatch: [
          "http://[^s]*",
          "^[-\\w]+/[-\\w\\.]+$", //For MIME Types
        ],
        skipWordIfMatch: [
          "^nimbus.*$", // words that begin with nimbus will not be checked
        ],
      },
    ],
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
};
