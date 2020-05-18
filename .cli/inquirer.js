/* eslint-disable */

const inquirer = require("inquirer");

const returnIndex = (str) => {
  return str.substring(0, str.indexOf(" "));
};

const getMenu = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "accion",
          message: "WHAT DO YOU WANT TO DO?",
          choices: ["1 - Create Component", new inquirer.Separator()],
        },
      ])
      .then((answers) => {
        console.log("\n");
        resolve(returnIndex(answers.accion));
      });
  });
};

let inputName = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message:
            "¿What name do you want to use?? (you must respect upper and lower case)",
          validate: (name) => {
            return name !== "";
          },
        },
      ])
      .then((answers) => {
        console.log("\n");
        resolve(answers.nombre[0].toUpperCase() + answers.nombre.slice(1));
      });
  });
};

module.exports = {
  getMenu,
  inputName,
};
