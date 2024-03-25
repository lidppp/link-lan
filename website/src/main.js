import { createApp } from 'vue'
import '@vant/touch-emulator';
import '@unocss/reset/tailwind.css'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import router from "@/router/index.js";

createApp(App)
	.use(router)
	.mount('#app')
