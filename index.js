import express from "express";
import path from "node:path";
import {fileURLToPath} from 'url';
import history from "connect-history-api-fallback"
import bodyParser from "body-parser"
import {createServer} from "http";
import {PeerServer} from "peer"

import "./utils/sql.js"
import {getIp} from "./utils/ip.js"
import {getPort} from "./utils/port.js"

import router from "./controller/index.js"

import createIO from "./socket.js";
import ResultMessage from "./utils/resultMessage.js";

export async function run(_port=3000) {
  const ip = getIp()
  const port = await getPort(_port)
  const peerPort = await getPort(port + 1)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  const app = express()
  const httpServer = createServer(app);
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'dist')));


  app.use(router)

  createIO(httpServer, peerPort)


  app.get("/api/getPeerPort", function (req, res) {
    res.send(ResultMessage.success({peerPort}))
  })
  app.use(history());
  app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'))
  })

  PeerServer({
    port: peerPort,
    path: "/peer",
    cors: {
      origin: "*",
    }
  });

  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`sever run in http://${ip}:${port}`)
    console.log(`socket.io run in ws://${ip}:${port}`)
    console.log(`peer.js run in http://${ip}:${peerPort}`)
    console.log(`\nOpen "http://${ip}:${port}" in your browser`)
  })
}


