#!/usr/bin/env node
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let oragniseObj = require("./commands/organise");
// const { treeKey } = require("./commands/tree");
let inputArr = process.argv.slice(2);
// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organise "directoryPath"
// node main.js help
let command = inputArr[0];

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organise":
        oragniseObj.organiseKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Wrong Command");
        break;
}





