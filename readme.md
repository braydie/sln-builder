# sln-builder

[![npm version](https://badge.fury.io/js/sln-builder.svg)](https://badge.fury.io/js/sln-builder) 

A lazy command line tool for building solutions.

It will look for solution files (.sln) recursively and compile them. If multiple .slns are found, you are prompted to pick one.

You will need to configure your path to MSBuild.exe. By default, this package will look for it where VS 2019 has been installed.

## Install 

```
npm install sln-builder -g
```

## Usage

In a directory that has some .sln files - doesn't have to be top level:

```
build
```

### Examples

```
build --configuration Release --all
build -c Release -a
```

```
build --all
build -a
```

### Options

```
-V, --version                               output the version number
-c, --configuration <configurationProfile>  configuration. Defaults to 'Debug'
-cl, --clean                                cleans solution before building
-a, --all                                   flag to indicate that all solutions found should be compiled
-h, --help                                  output usage information
```

### Custom sources

If you specify an environment variable of `NUGET_SOURCES` listing your package sources - separated by `;`, then they will be included as package sources alongside nuget.orgs package feed. [See this StackOverflow answer on setting up environment variables](https://stackoverflow.com/a/13333312/4477493).

```powershell
$env:NUGET_SOURCES='https://mynugetfeed.com;https://anotherfeed.com'
build
```
