#!/usr/bin/env node
require(`dotenv`).config({ path: `${__dirname}/.env` });

const program = require(`commander`);
const readline = require(`readline-sync`);
const log = require(`./logger`);
const files = require(`./files`);
const nuget = require(`./nuget`);
const msbuild = require(`./msbuild`);

const logAll = (results) => {
  log(`-----------`);
  log(`found the following solutions:`);
  for (let i = 0; i < results.length; i += 1) {
    log(`${i + 1} -- ${results[i]}`);
  }
  log(`----------`);
  log(``);
};

const build = (solution) => {
  const getSources = () => {
    const NUGET_ORG = `https://api.nuget.org/v3/index.json`;
    if (process.env.NUGET_SOURCES !== undefined) {
      return process.env.NUGET_SOURCES.split(`;`).push(NUGET_ORG);
    }
    return [NUGET_ORG];
  };

  nuget
    .restore({
      packages: solution,
      source: getSources(),
    })
    .then(() => {
      msbuild.build(solution, program.configuration, program.clean);
    });
};

const buildAll = (allSolutions) => {
  log(`building *all* solutions found`);
  for (let i = 0; i < allSolutions.length; i += 1) {
    build(allSolutions[i]);
  }
};

program
  .version(`1.0.0`)
  .option(
    `-c, --configuration <configurationProfile>`,
    `configuration. Defaults to "Debug"`,
    `Debug`,
  )
  .option(`-cl, --clean`, `cleans solution before building`, false)
  .option(`-a, --all`, `flag to indicate that all solutions found should be compiled`, false)
  .parse(process.argv);

files.find().then((results) => {
  if (results.length === 0) {
    log(`No solutions found`);
  } else if (program.all) {
    buildAll(results);
  } else if (results.length === 1) {
    build(results[0]);
  } else {
    logAll(results);

    const response = readline.question(
      `Which solution do you want to build? Enter the number or type "abort" to cancel:`,
    );
    if (response === `abort`) {
      log(`build cancelled`);
      return;
    }

    const solution = results[Number(response) - 1];
    build(solution);
  }
});
