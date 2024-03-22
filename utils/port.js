import express from "express"
const app = express()
// 查看端口是否被占用
function portUsed(port) {
  return new Promise((resolve, reject) => {
    let server = app.listen(port);
    server.on('listening', function () {
      console.log("listening")
      server.close();
      resolve(port);
    });
    server.on('error', function (err) {
      console.log("ERROR")
      if (err.code === 'EADDRINUSE') {
        reject(err);
      }else {
        throw err
      }
    });
  });
}

export const getPort = function (port) {
  return portUsed(port).then(res=>{
    return Promise.resolve(port);
  }).catch(err=>{
    port++;
    return getPort(port);
  })
}
