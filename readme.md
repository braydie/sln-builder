# sln-builder

[![npm version](https://badge.fury.io/js/sln-builder.svg)](https://badge.fury.io/js/sln-builder) 

A lazy command line tool for building solutions.

It will look for solution files (.sln) recursively and compile them. If multiple .slns are found, you are prompted to pick one.

**Currently only works with [2017 build tools (v15.0 of MSBuild)](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15) on Windows.** 

## Install 

```
npm install sln-builder -g
```

## Usage

In a directory that has some .sln files - doesn't have to be top level:

```
build
```

By default, solution will build in Debug, if you want to override:

```
build Release
```

### Custom sources

If you specify an environment variable of `NUGET_SOURCES` listing your package sources - separated by `;`, then they will be included as package sources alongside nuget.orgs package feed. [See this StackOverflow answer on setting up environment variables](https://stackoverflow.com/a/13333312/4477493).

```powershell
$env:NUGET_SOURCES='https://mynugetfeed.com;https://anotherfeed.com'
build
```
