module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Promise: true,
  },
  plugins: ["prettier", "spellcheck", "react-hooks", "react-perf"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
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
          "Alicorn",
          "Tiendanube",
          "Icons's",
          "rbg",
          "fal",
          "perf",
          "jsx",
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
    "plugin:react-perf/all",
    "plugin:prettier/recommended",
    "prettier/standard",
    "prettier/react",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
};
