import path from "node:path";
import fs from "fs";

export const fileExists = (_path) => {
  try {
    fs.accessSync(_path, fs.constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}

