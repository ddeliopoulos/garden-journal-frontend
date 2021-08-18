import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/global.css'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

createApp(App).use(ElementPlus).use(router).use(VueUniversalModal, {
    teleportTarget: '#modals'
}).mount('#app')
