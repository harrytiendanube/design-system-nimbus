/* eslint-disable */
const inquirier = require("./inquirer"),
  fs = require("fs"),
  chalk = require("chalk"),
  data = require("./data.js");

const routs = {
  components: "packages/components/src/",
  styles: "packages/styles/src/",
};

const createComponent = (variable) => {
  console.log(`Creating component ${chalk.cyan(variable)} \n`);
  return new Promise((resolve, reject) => {
    /* if (!rootProject()) {
      return reject("❗  NO TE ENCUENTRAS EN EL ROOT DEL PROYECTO  😱");
    } */
    if (fs.existsSync(routs.components + variable)) {
      return reject(
        "❗  COMPONENT ALREADY EXISTS, CHOOSE A DIFFERENT NAME  🤔 ",
      );
    } else {
      Promise.all([
        createFile(variable, "tsx", data.getTsxData(variable)),
        createFile(variable, "test.js", data.getTestData(variable)),
        createFile(variable, "scss", data.getScssData(variable)),
      ])
        .then(() => {
          Promise.all([
            addReferences(variable, "components", "tsx"),
            addReferences(variable, "styles", "scss"),
          ])
            .then(() => {
              resolve();
            })
            .catch((err) => {
              return reject("❗  References not added. ");
            });
        })
        .catch((err) => {
          return reject("❗  Files not added. ");
        });
    }
  });
};

function rootProject() {
  try {
    return fs.statSync("../.git").isDirector();
  } catch (e) {
    return false;
  }
}

const addReferences = (variable, package, extension) => {
  return new Promise((resolve, reject) => {
    const file = `${routs[package]}index.${extension}`;
    const data = getImportData(variable, package);
    fs.appendFile(
      file,
      data,
      function(err) {
        if (err) throw err;
      },
      () => {
        console.log("\n✔️   Reference added to " + file);
        resolve();
      },
    );
  });
};

const getImportData = (variable, package) => {
  return {
    styles: data.getInsertStyle,
    components: data.getInsertComponent,
  }[package](variable);
};

const getRoutType = (extension) => {
  return extension == "scss" ? "styles" : "components";
};

const createFile = (variable, extension, data) => {
  return new Promise((resolve, reject) => {
    const type = getRoutType(extension);
    /** Create folder  */
    fs.mkdirSync(routs[type] + variable, { recursive: true }, (err) => {
      if (err) throw err;
    });
    /** Create File  */
    const fileRoute =
      routs[type] + variable + "/" + getFileName() + "." + extension;
    fs.appendFile(
      fileRoute,
      data,
      function(err) {
        if (err) throw err;
      },
      () => {
        console.log("✔️   File created  " + fileRoute);
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
