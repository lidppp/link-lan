import sqlite3 from "sqlite3"
import fs from "fs"
import path from "node:path";
import {fileExists} from "./index.js";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initDB() {
  const sql3 = sqlite3.verbose()
  if (!fileExists(path.resolve(__dirname,"../data"))) {
    fs.mkdirSync(path.resolve(__dirname,"../data"))
  }
  const db = new sql3.Database(
      path.resolve(__dirname, '../data/msg.db'),
      function (err) {
        if (err) {
          return console.error(err.message)
        }
      }
  )
  db.run(`CREATE TABLE IF NOT EXISTS message(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  msg VARCHAR(10000) NULL,
  create_time VARCHAR(13) NULL
);`)
  db.run(`CREATE TABLE IF NOT EXISTS file(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename VARCHAR(10000) NULL,
  filepath VARCHAR(10000) NULL,
  create_time VARCHAR(13) NULL
);`)
  return db
}
initDB()

function closeDB(db) {
  db?.close(function (err) {
    if (err) {
      return console.log(err.message)
    }
    console.log('close database connection')
  })
}
export function runSql(sql, data) {
  return new Promise((resolve, reject) => {
    const db = initDB()
    db.run(sql, data, function (err, args) {
      if (err) {
        reject(err)
      } else {
        resolve(args)
      }
      closeDB(db)
    })
  })
}

export function sqlGet(sql, data) {
  return new Promise((resolve, reject) => {
    const db = initDB()
    db.all(sql, data, function (err, args) {
      if (err) {
        reject(err)
      } else {
        resolve(args)
      }
      closeDB(db)
    })
  })
}





