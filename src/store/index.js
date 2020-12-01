import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowChatId: null,
    chatDB: {
      1: [
        {
          type: 'message',
          from: 1,
          content: [
            { type: 'text', content: '你好' },
            { type: 'img', content: 'avatar.png' }
          ]
        },
        {
          type: 'time',
          time: '10:59'
        },
        {
          type: 'notice',
          content: '🎉 李亮亮 加入了群聊！'
        }
      ]
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
