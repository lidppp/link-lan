#!/usr/bin/env node
import build from "./website/build.js";
import fs from "fs";
import {fileURLToPath} from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("build website file")
const args = process.argv.slice(2)

const distDirExists = () => {
  try {
    fs.accessSync(path.join(__dirname, "./dist/index.html"), fs.constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}
if (!distDirExists() || args.includes("-f")){
  await build()
} else {
  console.log("Skip build file")
}

console.log("run server\n");

import("./index.js")

