<template>
  <div class="pb30px">
    <div class="title">
      Transfer File
    </div>
    <template v-if="!myPeerId">
      <div class="empty">connecting...</div>
    </template>
    <template v-if="myPeerId">
      <div class="me flex items-center justify-center gap-15px p20px sticky top-0 bg-white" @click="openMe">
        <div class="avatar w60px h60px" :style="getAvatar(myPeerId)"></div>
        <div class="max-w-40% truncate">{{ myPeerId }}</div>
        <label for="up" @click.stop="()=>{}">
          <van-icon class="px10px hover:text-teal-500 transition-all-300 cursor-pointer rotate--90deg" size="22"
                    name="exchange"/>
          <input type="file" id="up" hidden="hidden" ref="file" @change="fileChange">
        </label>
      </div>
      <div class="empty" v-if="!outputUserList.length">
        Empty
      </div>
      <div class="grid grid-cols-3">
        <template v-if="outputUserList.length">
          <div class="items" @click="openOther(item)" v-for="item in outputUserList" :key="item.key">
            <div class="avatar w-40px h-40px" :style="getAvatar(item.peerId)"></div>
            <div class="name truncate max-w-full">{{ item.peerId }}</div>
          </div>
        </template>
      </div>
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-white transition-all-300 translate-y--100%"
           :class="{filesOpen: openFiles}">
        <div class="me flex items-center justify-between  p20px sticky top-0 bg-white">
          <div class="flex flex-grow items-center justify-center gap-15px">
            <div class="avatar w40px h40px" :style="getAvatar(openFilesData.peerId)"></div>
            <div class="max-w-40% truncate">{{ openFilesData.peerId }}</div>
          </div>
          
          <van-icon class="p10px rounded-full hover:text-amber transition-all-300 cursor-pointer justify-self-end"
                    style="box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;"
                    size="22" name="arrow-up" @click="openFiles=false"/>
        </div>
        <div class="m20px text-16px text-center text-#777">
          Shared Files
        </div>
        <div class="empty" v-if="!openFilesData.files?.length">
          Empty
        </div>
        <template v-if="openFilesData.files?.length">
          <div class="items !flex-row mx20px" v-for="(item,index) in openFilesData?.files" @click="getFile(index)">
            <div class="flex-grow">{{ item.name }}</div>
            <div class="flex-shrink-0 px-15px hover:text-red transition-all-300">
              {{ readableBytes(item.size) }}
            </div>
          </div>
        </template>
      </div>
    
    </template>
    
    
    <div
      class="sticky bottom-0 p20px bg-#fff flex items-center justify-end text-#777 hover:text-black active:text-black transition-all-300 rounded-16px">
      <router-link to="/">Go To Transfer Text
        <van-icon class="rotate--90deg ml-10px" name="down"/>
      </router-link>
    
    </div>
  
  
  </div>
</template>

<script setup>
import {ref, onMounted, computed,onUnmounted} from "vue"
import {getAvatar} from "@/utils/avatar.js";
import {downloadFile, readableBytes} from "../utils/index.js";
import io from "socket.io-client"
import Peer from "peerjs";
import http from "@/utils/http.js";
import {showNotify} from "vant";

const userList = ref({}) // 全部用户列表
const outputUserList = computed(()=>{
  let keys = Object.keys(userList.value);
  let outArr = []
  for (let i = 0; i < keys.length; i++) {
    if (keys[i]===myPeerId.value){
      continue
    }
    outArr.push(userList.value[keys[i]])
  }
  
  return outArr
})
const myFiles = ref([]) // 我的文件列表
const mySocketId = ref("") // 我的socketId
const myPeerId = ref("") // 我的peerId
const file = ref(null)  // fileDom ref
const fileChange = (e) => {
  console.log(e);
  if (e.target.files.length) {
    myFiles.value.push(e.target.files[0])
    console.log(e.target.files[0]);
    file.value.value = ""
    socket.emit("select_file", JSON.stringify(myFiles.value.map(item => {
      return {
        name: item.name,
        size: item.size
      }
    })))
    showNotify({
      type: "success",
      message: "File Read Successfully"
    })
  }
}
const getFileMessage = ref({})

const getFile = (index) => {
  if (openMeFlag.value) {
    return
  }
  getFileMessage.value = openFilesData.value.files[index]
  socket.emit("getFile", JSON.stringify({index, peerId: openFilesData.value.peerId, reqPeerId: myPeerId.value}))
}

//与后台服务器的WebSocket连接
const socket = io("ws://" + location.host, {transports: ['websocket']});
let peer;

onMounted(() => {
  http({
    method: "get",
    url: "/getPeerPort"
  }).then(res => {
    console.log(res,location.host)
    peer = new Peer(undefined, {
      host: location.hostname,
      port: res.data.peerPort,
      path: "/peer",
      debug:3,
    });
    peer.on('open', function (id) {
      myPeerId.value = id
      console.log('My peer ID is: ' + id);
      socket.emit("join", myPeerId.value)
    });
    peer.on('connection', function(_conn) {
      createCoon(_conn)
    });
  })
})


socket.on("connect", () => {
  console.log("socket id : " + socket.id)
  mySocketId.value = socket.id
})
socket.on("update_ids", (_ids) => {
  userList.value = JSON.parse(_ids)
})
socket.on("send_file", (data) => {
  data = JSON.parse(data)
  if (myPeerId.value === data.peerId) {
    createCoon(peer.connect(data.reqPeerId), (_conn) => {
      _conn.send(myFiles.value[data.index])
    })
  }
})


const createCoon = (_conn, cb = () => {
}) => {
  _conn.on('open', function () {
    cb(_conn)
    // Receive messages
    _conn.on('data', function (data) {
      console.log('open Received', data);
      downloadFile(data, getFileMessage.value.name, () => {
        showNotify({
          type: "success",
          message: "Downloading"
        })
        close(_conn)
      });
    });
    
    _conn.on("close", function (data) {
      close(_conn)
    })
  });
}


const close = (conn) => {
  conn.close()
  getFileMessage.value = {}
}


// 页面逻辑操作部分
const openFiles = ref(false)
const openFilesData = ref({})
const openMeFlag = ref(false)
const openMe = () => {
  openFilesData.value = {
    peerId: myPeerId.value,
    files: myFiles.value
  }
  openMeFlag.value = true
  openFiles.value = true
}
const openOther = (item) => {
  openMeFlag.value = false
  openFilesData.value = item
  openFiles.value = true
}

onUnmounted(()=>{
  socket.disconnect()
  peer.destroy()
})

</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  text-align: center;
  font-weight: 500;
}

.empty {
  padding: 40px;
  text-align: center;
  color: #ababab;
}

.items {
  font-size: 18px;
  color: #777777;
  padding: 15px 20px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;
    border-radius: 16px;
  }
  
}

.filesOpen {
  --un-translate-y: 0;
}
</style>
