import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import request from '@/services'

window.$request = request
const app = createApp(App)
app.config.globalProperties.$message = message
app.use(Antd).use(store).use(router).mount('#app')
