#!/usr/bin/env node

const { createInterface } = require("readline");
const { timewarriorRecap } = require("./timewarrior-recap.js");
const { formatForLogging } = require("./format-for-logging.js");

const readline = createInterface({
  input: process.stdin,
});

// Configuration block, values look like this:
// debug: off
// reports.day.cell: 15
// temp.version: 1.4.3
// verbose: on
const configurationRegEx = new RegExp(/\w:\s.*$/);
const configuration = new Map();
const gatheredJsonLines = [];

readline.on("line", (line) => {
  if (line.match(configurationRegEx)) {
    // Characters used to separate between key and value are documented here
    // https://timewarrior.net/docs/api/#input-format
    const [key, value] = line.split(": ");
    configuration.set(key, value);

    // We should also evaluate timewarrior options like 'verbose' and 'debug'
    // at some point as recommended by
    // https://timewarrior.net/docs/api/#guidelines
  }
  else if (line === "") {
    // Configuration block is separated from JSON via a newline which we want to skip
    // https://timewarrior.net/docs/api/#input-format
  }
  else {
    gatheredJsonLines.push(line);
  }
});

readline.once("close", () => {
  const report = JSON.parse(gatheredJsonLines.join(""));

  console.log(formatForLogging(timewarriorRecap(report)));
});
