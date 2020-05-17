/* eslint-disable */
const inquirier = require("./inquirer");

const fs = require("fs"),
  chalk = require("chalk"),
  utilFiles = require("./data.js");

const routs = {
  components: "packages/components/src/",
  scss: "app/assets/scss/app-part-2.scss",
};

const createComponent = (variable) => {
  console.log("Crear archivo");
  return new Promise((resolve, reject) => {
    console.log("crear HTML");
    createFile(variable, "tsx", utilFiles.getTsxData(variable));
    createFile(variable, "test.js", utilFiles.getTestData(variable));
    /* if (!rootProject()) {
      return reject("❗  NO TE ENCUENTRAS EN EL ROOT DEL PROYECTO  😱");
    } */
    /* if (fs.existsSync(routs.components + variable)) {
      return reject(
        "❗  EL COMPONENTE YA EXISTE, DEBES ELEGIR OTRO NOMBRE  🤔 ",
      );
    } else {
      Promise.all([
          createFile(variable, "scss", utilFiles.getCssData(variable)),
          createFile(variable, "html", utilFiles.getHTMLdata(variable)),
          createFile(variable, "js", utilFiles.getJsData(variable)),
        ]).then(() => {
          addReferences(variable).then(() => {
            resolve();
          });
        });
    } */
  });
};

function rootProject() {
  try {
    return fs.statSync("../.git").isDirector();
  } catch (e) {
    return false;
  }
}

const addReferences = (variable) => {
  return new Promise((resolve, reject) => {
    let className = utilFiles.getCssClassName(variable);
    let scssData =
      '@import "../../js/app/components/' + variable + "/" + className + '";\n';
    fs.appendFile(
      routs.scss,
      scssData,
      function(err) {
        if (err) throw err;
      },
      () => {
        console.log("\n✔️   Se agregó referencia a " + routs.scss);
        resolve();
      },
    );
  });
};

const createFile = (variable, extension, data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    /** Create folder  */
    fs.mkdirSync(routs.components + variable, { recursive: true }, (err) => {
      if (err) throw err;
    });
    /** Create File  */
    const fileRoute =
      routs.components + variable + "/" + getFileName() + "." + extension;
    fs.appendFile(
      fileRoute,
      data,
      function(err) {
        if (err) throw err;
      },
      () => {
        console.log("✔️   " + fileRoute);
        resolve();
      },
    );
  });

  function getFileName() {
    return extension == "tsx" ? "index" : variable;
  }
};

module.exports = {
  createComponent,
};
