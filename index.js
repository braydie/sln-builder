#!/usr/bin/env node
const program = require('commander');
const readline = require('readline-sync');
const log = require('./logger');
const files = require('./files');
const nuget = require('./nuget');
const msbuild = require('./msbuild');

program
  .version('0.1.0')
  .option('-c, --configuration <configurationProfile>', 'configuration. Defaults to "Debug"', 'Debug')
  .option('-cl, --clean', 'cleans solution before building', false)
  .option('-a, --all', 'flag to indicate that all solutions found should be compiled', false)
  .parse(process.argv);

files.find().then(files => {
  if (files.length === 0) {
    log('No solutions found');
    return;
  } else if (program.all) {
    buildAll(files);
    return;
  } else if (files.length === 1) {
    build(files[0]);
  } else {
    logAll(files);

    const response = readline.question('Which solution do you want to build? Enter the number or type "abort" to cancel:');
    if (response === 'abort') {
      log('build cancelled');
      return;
    }

    const solution = files[parseInt(response) - 1];
    build(solution);
    return;
  }
});

const logAll = files => {
  log('-----------');
  log('found the following solutions:');
  for (let i = 0; i < files.length; i++) {
    log(i + 1 + ' -- ' + files[i]);
  }
  log('----------');
  log('');
};

const buildAll = files => {
  log('building *all* solutions found');
  for (let i = 0; i < files.length; i++) {
    build(files[i]);
  }
};

const build = solution => {
  const getSources = () => {
    const NUGET_ORG = 'https://api.nuget.org/v3/index.json';
    if (process.env.NUGET_SOURCES !== undefined) {
      return process.env.NUGET_SOURCES.split(';').push(NUGET_ORG);
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
