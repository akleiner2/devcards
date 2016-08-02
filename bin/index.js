#!/usr/bin/env node --harmony
const program = require('commander');
const fs = require('fs');
const path = require('path');

function pathExists(path) {
  try {
    return fs.statSync(path).isFile() || fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

function createFile(path) {
  try {
    fs.closeSync(fs.openSync(path, 'w'));
  } catch (err) {
    throw err;
  }
}

function mkdir(path) {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    throw err;
  }
}

function makeFileAndFolder(folder, file) {
  if (!pathExists(folder)) {
    mkdir(folder);
    createFile(file);
  } else {
    if (!pathExists(file)) {
      createFile(file);
    }
  }
}

function createFiles(module, dir) {
  const docs = path.join(dir, '__docs__');
  const tests = path.join(dir, '__tests__');
  const js = path.join(dir, `${module}.js`);
  const css = path.join(dir, `${module}.css`);
  const doc = path.join(docs, `${module}-doc.js`);
  const test = path.join(tests, `${module}.jest.js`);

  makeFileAndFolder(docs, doc);

  makeFileAndFolder(tests, test);

  if (!pathExists(js)) {
    createFile(js);
  }

  if (!pathExists(css)) {
    createFile(css);
  }
}

function createFilesForModule(module, curPath='.') {
  if (pathExists(curPath)) {
    const dir = path.join(`${curPath}`,`${module}`);
    if (pathExists(dir)) {
      createFiles(module, dir);
    } else {
      mkdir(dir);
      createFiles(module, dir);
    }
  } else {
    console.log("Please provide a valid directory where you would like to create the documentation.");
  }
}

program
  .arguments('<cmd> <module> [dir]')
  .action((cmd, module, dir) => {
    createFilesForModule(module, dir)
  })
  .parse(process.argv);
