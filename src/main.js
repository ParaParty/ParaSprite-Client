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
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('localhost:8888')
// }))
Vue.use(Contextmenu)
Vue.use(Viewer)
Vue.use(VueAxios, axios)
Vue.prototype._ = _

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
