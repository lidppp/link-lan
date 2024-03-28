import {build} from "vite"
import path from "node:path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default async function () {
  await build({
    configFile: path.join(__dirname, "vite.config.js"),
    logLevel: "silent",
  })
}
