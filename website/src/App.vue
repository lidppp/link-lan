<template>
  <div class="layout">
    <div class="content-main relative">
      <router-view />
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

.layout{
  height: 100%;
  background: linear-gradient(102.7deg, #fddaff 8.2%, #dfadfc 19.6%, #adcdfc 36.8%, #adfcf4 73.2%, #caf8d0 90.9%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-main{
  margin: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
