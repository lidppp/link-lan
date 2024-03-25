<template>
  <router-view />
</template>

<script setup>
import http from "@/utils/http"
http({
  method: "get",
  url: "/message"
}).then(res=>{
  console.log(res)
})
</script>

<style scoped lang="scss">

</style>
