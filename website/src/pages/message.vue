<template>
  <div class="pb30px">
    <div class="title">
      Transfer Text
    </div>

    <div class="flex items-center gap-10px pt15px pb30px sticky top-0 bg-white z1 rounded-16px">
      <input type="text" class="border-b px-15px lh-34px flex-grow" placeholder="Input Transfer text" v-model="msg" @keyup.enter="add">
      <Icon class="px10px hover:text-green transition-all-300 cursor-pointer" size="22" name="add-o" @click="add"/>
      <Icon class="px10px hover:text-blue transition-all-300 cursor-pointer" size="20" name="replay"
                @click="reload"/>
    </div>

    <div class="empty" v-if="!list.length">
      Empty
    </div>

    <template v-if="list.length">
      <div class="items" @click="copyFn(item)" v-for="item in list" :key="item.key">
        <div class="flex-grow">{{ item.msg }}</div>
        <div class="flex-shrink-0 px-15px hover:text-red transition-all-300" @click.stop="del(item)">
          <Icon name="delete-o"/>
        </div>
      </div>
    </template>
    
    <div class="sticky bottom-0 p20px bg-#fff flex items-center justify-end text-#777 hover:text-black active:text-black transition-all-300 rounded-16px">
      <router-link to="/file">Go To Transfer File<Icon class="rotate--90deg ml-10px" name="down" /></router-link>
      
    </div>

  </div>
</template>

<script setup>
import {getMessage, addMessage, delMessage} from "@/api/message.js";
import {ref, onMounted} from "vue"
import copy from 'copy-to-clipboard';
import {showNotify, Icon} from "vant";

const list = ref([])
const msg = ref("")

const getList = () => {
  getMessage().then(res => {
    list.value = res.data
  })
}
onMounted(() => {
  getList()
})
const reload = () => {
  getList()
}
const add = () => {
  if (!msg.value){
    return
  }
  addMessage({msg: msg.value}).then(res => {
    reload()
    msg.value = ""
    showNotify({
      message: "Send Success",
      type: "success"
    })
  })
}

const del = (item) => {
  delMessage({id: item.id}).then(res => {
    reload()
  })
}
const copyFn = (item) => {
  console.log("copy")
  copy(item.msg)
  showNotify({
    message: "Copied to clipboard",
    type: "success"
  })
}


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

  &:hover {
    box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;
    border-radius: 16px;
  }

}
</style>
