#!/usr/bin/env node
import {shell} from "./utils/runShell.js";

console.log(await shell("npm run start"));

