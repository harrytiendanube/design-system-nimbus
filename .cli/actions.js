/* eslint-disable */

const chalk = require("chalk"),
  files = require("./files.js"),
  inquirer = require("./inquirer.js");

function init() {
  inquirer.getMenu().then((index) => {
    return actions[index]();
  });
}

const createComponenet = () => {
  inquirer.inputName().then((variable) => {
    files
      .createComponent(variable)
      .then((res) => {
        console.log("\n");
        console.log("👌  ¡Componente creado con éxito! 🎉");
      })
      .catch((err) => {
        console.log(chalk`{red  ${err}}`);
      });
  });
};

const actions = {
  1: createComponenet,
};

module.exports = {
  init,
};
