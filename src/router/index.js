import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
import picViewer from '@/views/picViewer.vue'
import video from '@/views/video.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/picviewer',
    name: 'picViewer',
    component: picViewer
  },
  {
    path: '/video',
    name: 'video',
    component: video
  }
]

const router = new VueRouter({
  routes
})

export default router
