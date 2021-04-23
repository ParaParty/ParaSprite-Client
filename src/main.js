import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Contextmenu from 'vue-contextmenujs'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import _ from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import Toast from '@/components/toast'
axios.defaults.baseURL = 'http://127.0.0.1:7001'
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://127.0.0.1:7001', {
    autoConnect: false
  })
  // options: { autoConnect: false }
}))
Vue.use(Contextmenu)
Vue.use(Viewer)
Vue.use(VueAxios, axios)
Vue.use(Toast)
Vue.prototype._ = _

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
