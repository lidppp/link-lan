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
      <input v-model="msg" @keyup.enter="send">
    </div>
    
    <div v-for="(item, index) in ids">
      <div :class="{my: mySocketId === index, link: linkId===item}" @click="link(item, mySocketId === index || linkId===item)">
        {{ index }} : &nbsp;&nbsp;{{ item }}
      </div>
    </div>
    
    <div>
      <div v-for="item in msgs">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script setup>
import io from "socket.io-client"
import {ref} from "vue";
import Peer from "peerjs";

const myPeerId = ref()
const mySocketId = ref()
const ids = ref({})
const msg = ref("")
const msgs = ref([])
const linkId = ref("")
const send = ()=>{
  if (!conn.value){
    return
  }
  msgs.value.push("自己: "+msg.value)
  conn.value.send(msg.value)
  msg.value = ""
}
//与后台服务器的WebSocket连接
const socket = io("ws://"+location.hostname+":3000");
socket.on("connect", () => {
  console.log("socket id : " + socket.id)
  mySocketId.value = socket.id
})
socket.on("update_ids", (_ids) => {
  ids.value = JSON.parse(_ids)
})

const peer = new Peer();
peer.on('open', function (id) {
  myPeerId.value = id
  console.log('My peer ID is: ' + id);
  socket.emit("join", myPeerId.value)
});

let conn = ref(null)

peer.on('connection', function(_conn) {
  createCoon(_conn)
});
const link = (peerId, flag) => {
  if (flag || conn.value) {
    return
  }
  createCoon(peer.connect(peerId))
}

const createCoon = (_conn)=>{
  _conn.on('open', function () {
    console.log(conn.value)
    conn.value = _conn
    linkId.value = conn.value.peer;
    // Receive messages
    conn.value.on('data', function (data) {
      console.log('Received', data);
      msgs.value.push("对方: "+data)
    });
    
    conn.value.on("close", function (data){
      close()
    })
  });
}


const close = ()=>{
  conn.value?.close()
  conn.value = null
  linkId.value = ""
}
</script>

<style scoped>
.my {
  background: indianred;
}
.link{
  background: aquamarine;
}
</style>
