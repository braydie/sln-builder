# sln-builder

[![npm version](https://badge.fury.io/js/sln-builder.svg)](https://badge.fury.io/js/sln-builder) 

A lazy command line tool for building solutions.

It will look for solution files (.sln) and compile them. If multiple .slns are found, you are prompted to pick one.

**Currently only works with 2017 build tools (v15.0 of MSBuild) on Windows.**

## Install 

```
npm install sln-builder -g
```

## Usage

In a directory that has some .sln files:

```
build
```

By default, solution will build in Debug, if you want to override:

```
build Release
```
