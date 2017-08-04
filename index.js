#!/usr/bin/env node
var _msbuild = require('msbuild');
var filehound = require('filehound');
var readline = require('readline-sync');
var Nuget = require('nuget-runner');
var program = require('commander');

var msbuild = new _msbuild();

program
    .version('0.0.4')
    .option('-c, --configuration <configurationProfile>', 'configuration. Defaults to \'Debug\'', 'Debug')
    .option('-a, --all', 'flag to indicate that all solutions found should be compiled', false)
    .parse(process.argv);

var files = filehound.create()
    .paths(process.cwd())
    .ext('sln')
    .find();

files.then(function(files) {   
    if (files.length === 0) {
        console.log('No solutions found');
        return;
    } else if (program.all) {
        console.log('building *all* solutions found')
        for(var i = 0; i < files.length; i++) {
            build(files[i], program.configuration);            
        }
        return;    
    } else if (files.length === 1) {
        build(files[0], program.configuration);
    } else {
        console.log('-----------');
        console.log('found the following solutions:');
        for(var i = 0; i < files.length; i++) {
            console.log((i + 1) + " -- " + files[i]);
        }
        console.log('----------');
        console.log('');

        var response = readline.question('Which solution do you want to build? Enter the number or type \'abort\' to cancel:');
        if(response === 'abort') {
            console.log('build cancelled');
            return;
        }

        var solution = files[parseInt(response) - 1];
        build(solution, program.configuration);
        return;
    }
});

function build(solution, configuration) {
    function getSources() {
        const NUGET_ORG = 'https://api.nuget.org/v3/index.json';
        if(process.env.NUGET_SOURCES !== undefined) { 
            var env_sources = process.env.NUGET_SOURCES.split(';');
            env_sources.push(NUGET_ORG);
            return env_sources;
        }    
        return [NUGET_ORG];        
    }
    var nuget = Nuget({
        nugetPath: __dirname + './nuget.exe'
    });

    nuget.restore({
        packages: solution,
        source: getSources()
    }).then(function() {
        msbuild.getMSBuildPath = function(os, process, version) {
            return 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe';
        }
        msbuild.version = '15.0';
        msbuild.sourcePath = solution;
        msbuild.configuration = configuration;
        msbuild.overrideParams.push('/p:Platform=Any CPU');
        msbuild.build();
    });        
}