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
          message: "¿QUÉ QUIERES HACER?",
          choices: ["1 - Crear Componente", new inquirer.Separator()],
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
          message: "¿Qué nombre deseas utilizar? (debe comenzar con mayúscula)",
          validate: (name) => {
            return name !== "";
          },
        },
      ])
      .then((answers) => {
        console.log("\n");
        resolve(answers.nombre);
      });
  });
};

module.exports = {
  getMenu,
  inputName,
};
