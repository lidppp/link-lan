<template>
  <div class="layout">
    <div class="content-main relative">
      <OverlayScrollbarsComponent defer :options="scrollOption">
        <div class="max-h-70vh p20px">
          <router-view/>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  
  </div>
</template>

<script setup>
import {ref} from "vue"
import {OverlayScrollbarsComponent} from "overlayscrollbars-vue";
const scrollOption = ref({
  overflow:{x:'hidden'},
  scrollbars: {
    autoHide: "scroll",
    autoHideDelay: 500
  }
})
</script>

<style scoped lang="scss">

.layout {
  height: 100%;
  background: linear-gradient(102.7deg, #fddaff 8.2%, #dfadfc 19.6%, #adcdfc 36.8%, #adfcf4 73.2%, #caf8d0 90.9%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-main {
  margin: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
}
</style>
