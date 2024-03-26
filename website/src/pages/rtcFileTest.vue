<template>
  <div>
    <div v-if="conn">
      已经连接
      <button @click="close">断开连接</button>
    </div>
    <div>
      tip: 红色背景色代表自己, 绿色背景代表已经连接的人, 没有背景色代表别人, 点击别人即可链接, 输入框按回车发送消息
    </div>
    <div>
      <input type="file" ref="file" @change="fileChange">
    </div>
    
    <div v-for="(item, index) in ids">
      <div :class="{my: myPeerId === item.peerId, link: linkId===item.peerId}"
           @click="link(item, mySocketId === index || linkId===item.peerId)">
        {{ index }} : &nbsp;&nbsp;{{ item.peerId }}
      </div>
    </div>
    
    <div>
      对方文件
      <div v-for="(item,index) in otherFiles" @click="get_file(index)">
        {{ item.name }} / {{ readableBytes(item.size) }}
      </div>
    </div>
    
    <div>
      我的文件
      <div v-for="item in files">
        {{ item.name }} / {{ readableBytes(item.size) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import io from "socket.io-client"
import {computed, ref} from "vue";
import Peer from "peerjs";

const myPeerId = ref()
const mySocketId = ref()
const ids = ref({})
const linkId = ref("")
const file = ref(null)
const files = ref([])
const getFileMessage = ref({})
const otherFiles = computed(() => {
  return ids.value[linkId.value]?.files || []
})
const get_file = (index) => {
  getFileMessage.value = otherFiles.value[index]
  socket.emit("get_file", JSON.stringify({index, peerId: linkId.value, reqPeerId: myPeerId.value}))
}
const fileChange = (e) => {
  console.log(e);
  if (e.target.files.length) {
    files.value.push(e.target.files[0])
    console.log(e.target.files[0]);
    file.value.value = ""
    socket.emit("select_file", JSON.stringify(files.value.map(item => {
      return {
        name: item.name,
        size: item.size
      }
    })))
  }
  
}

function readableBytes(bytes) {
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}


//与后台服务器的WebSocket连接
const socket = io("ws://" + location.hostname + ":3000");
socket.on("connect", () => {
  console.log("socket id : " + socket.id)
  mySocketId.value = socket.id
})
socket.on("update_ids", (_ids) => {
  ids.value = JSON.parse(_ids)
})
socket.on("send_file", (data) => {
  data = JSON.parse(data)
  if (myPeerId.value === data.peerId) {
    createCoon(peer.connect(data.reqPeerId), () => {
      conn.value.send(files.value[data.index])
    })
  }
})

const peer = new Peer();
peer.on('open', function (id) {
  myPeerId.value = id
  console.log('My peer ID is: ' + id);
  socket.emit("join", myPeerId.value)
});

let conn = ref(null)

peer.on('connection', function (_conn) {
  createCoon(_conn)
});
const link = (item, flag) => {
  linkId.value = item.peerId
}

function bufToFile(buf, filename) {
  const file = new File([buf], filename);
  
  function download(downloadFile) {
    const tmpLink = document.createElement("a");
    const objectUrl = URL.createObjectURL(downloadFile);
    
    tmpLink.href = objectUrl;
    tmpLink.download = downloadFile.name;
    // TODO 添加a标签样式 不然页面会抖动
    document.body.appendChild(tmpLink);
    tmpLink.click();
    
    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
  }
  
  download(file);
  close()
  
}

const createCoon = (_conn, cb = () => {
}) => {
  _conn.on('open', function () {
    console.log(conn.value, _conn)
    conn.value = _conn
    cb()
    // Receive messages
    conn.value.on('data', function (data) {
      console.log('Received', data);
      bufToFile(data, getFileMessage.value.name);
    });
    
    conn.value.on("close", function (data) {
      close()
    })
  });
}


const close = () => {
  conn.value?.close()
  conn.value = null
  getFileMessage.value = {}
}
</script>

<style scoped>
.my {
  background: indianred;
}

.link {
  background: aquamarine;
}
</style>
