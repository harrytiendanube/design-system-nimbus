const tasks = (arr) => arr.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": "yarn lint-staged",
    "pre-push": tasks(["yarn lint", "yarn test"]),
  },
};
