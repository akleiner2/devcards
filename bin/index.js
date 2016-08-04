#!/usr/bin/env node
const glob = require('glob');
const fs = require('fs');
const path = require('path');

let docs = glob.sync('*/**/__docs__/*-doc.js');

if (docs.length === 0) {
  console.log("No documentation was found.");
} else {
  docs = docs.map((doc, i) => {
    return path.join(process.cwd(), doc);
  });
}
