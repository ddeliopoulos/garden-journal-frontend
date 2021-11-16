import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/global.css'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'
import VueGapi from 'vue-gapi'


createApp(App).use(ElementPlus).use(router).use(VueUniversalModal, {
    teleportTarget: '#modals'
}).use(VueGapi, {
        apiKey: "",
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: "826903811377-7vc3unief3g7bbn341cr06kbfvbb49no.apps.googleusercontent.com",
        scope: 'profile',
    }
).mount('#app')
