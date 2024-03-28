#!/usr/bin/env node
import {shell} from "./utils/runShell.js";
import build from "./website/build.js";
console.log(await shell("echo 'build website file'"));

await build()

console.log(await shell("echo 'run server'"));

import("./index.js")

