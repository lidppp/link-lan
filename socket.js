import {Server} from "socket.io";

export default function createIO (httpServer){
  const io = new Server(httpServer,{
  cors: {
    origin: "*"
  }
});
const idMap = {}
const ids = {}
io.on("connection", (socket) => {

  function updateIds(){
    socket.emit("update_ids", JSON.stringify(ids))
    socket.broadcast.emit("update_ids", JSON.stringify(ids))
  }
  // 用户加入房间
  socket.on('join', (data) => {
    ids[data] = {...ids[idMap[socket.id]], peerId: data}
    idMap[socket.id] = data
    updateIds()
  })

  socket.on("disconnect", (reason) => {
    delete ids[idMap[socket.id]]
    delete idMap[socket.id]
    updateIds()
  });

  socket.on("select_file",(data)=>{
    ids[idMap[socket.id]] = {...ids[idMap[socket.id]], files: JSON.parse(data)}
    updateIds()
  })

  socket.on("get_file",(data)=>{
    socket.broadcast.emit("send_file", data)
  })
});
}



