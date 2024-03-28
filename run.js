#!/usr/bin/env node
import build from "./website/build.js";
import fs from "fs";
import {fileURLToPath} from "url";
import path from "node:path";
import {run} from "./index.js"
import {fileExists} from "./utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2)

if (args.includes("-h")) {
  console.log(`
LinkLAN. File Transfer Assistant.
-h\thelp message
-f\tforce rebuild webpage
-p\tSpecify the running port. Default port is 3000.
  `)
  process.exit()
}
let port = 3000;
if (args.includes("-p")){
  const index = args.indexOf("-p") + 1
    if (args[index] && parseInt(args[index]) && parseInt(args[index])>80 && parseInt(args[index])<65535) {
      port = parseInt(args[index])
    }else {
      console.log("Please enter a number greater than 80 and less than 65535.")
      process.exit()
    }
}

console.log("build website file")

if (!fileExists(path.resolve(__dirname,"./dist/index.html")) || args.includes("-f")){
  await build()
} else {
  console.log("Skip build file")
}

console.log("run server\n");

run(port)

