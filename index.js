import express from "express";
import path from "node:path";
import {fileURLToPath} from 'url';
import history from "connect-history-api-fallback"
import bodyParser from "body-parser"
import {createServer} from "http";

import "./utils/sql.js"
import {getIp} from "./utils/ip.js"
import {getPort} from "./utils/port.js"

import router from "./controller/index.js"

import createIO from "./socket.js";

const ip = getIp()
const port = await getPort(3000)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(router)

app.use(history());

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})
const httpServer = createServer(app);
createIO(httpServer)
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`run in http://${ip}:${port}`)
  console.log(`ws://${ip}:${port}`)
})

