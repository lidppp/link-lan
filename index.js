import express from "express";
import path from "node:path";
import {fileURLToPath} from 'url';
import history from "connect-history-api-fallback"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/api", function (req, res) {
  res.send("hello world")
})




app.use(history());

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname , './dist/index.html'))
})
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`)
})
