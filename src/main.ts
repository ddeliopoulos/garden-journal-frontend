import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/global.css'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                          //icons
import Vue from 'vue';

createApp(App).use(ElementPlus).use(router).use(VueUniversalModal, {
    teleportTarget: '#modals'
}).use(PrimeVue).use(ToastService).use(ConfirmationService)
    .component('Toast', Toast).component('Button', Button).component('Dialog', Dialog)
    .mount('#app')
