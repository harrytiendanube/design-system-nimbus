#!/usr/bin/env node

/* eslint-disable */
const chalk = require("chalk");
actions = require("./actions");

// HEADER
process.stdout.write("\x1Bc");

console.log(chalk`☁️   Nimbus CLI {cyan Tiendanube }  ☁️`);
console.log("\n");

actions.init();
