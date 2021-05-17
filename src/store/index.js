import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    userData: {},
    nowChatId: null,
    nowChatType: null,
    showPop: '',
    // 存储聊天记录
    chatDB: {
      user: {
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
            content: '10:59'
          },
          {
            type: 'notice',
            content: '🎉 李亮亮 加入了群聊！'
          },
          {
            type: 'message',
            from: 0,
            content: [
              { type: 'text', content: '不出意外这条信息应该是我发的' }
            ]
          },
          {
            type: 'card',
            content: {
              type: 'friendRes',
              id: '123123123'
            }
          }
        ],
        2: [
          {
            type: 'message',
            from: 1,
            content: [
              { type: 'text', content: '123' }
            ]
          }
        ]
      },
      group: {
        1: [
          {
            type: 'message',
            from: 1,
            content: [
              { type: 'text', content: '你好' },
              { type: 'img', content: 'avatar.png' }
            ]
          }
        ]
      }
    },
    // 存储id关联信息
    include: {
      // user: {
      //   0: {
      //     nick: '陆陆侠',
      //     avatar: 'avatar2.png',
      //     online: 0,
      //     emoji: '📢',
      //     sign: 'SB————'
      //   },
      //   1: {
      //     nick: '槕纸喵',
      //     avatar: 'avatar.png',
      //     online: 0,
      //     emoji: '🐟',
      //     sign: '摸鱼中'
      //   },
      //   2: {
      //     nick: '李亮亮',
      //     avatar: 'avatar2.png',
      //     online: 1,
      //     emoji: '',
      //     sign: ''
      //   },
      //   3: {
      //     nick: '剑羽',
      //     avatar: 'avatar2.png',
      //     online: 1,
      //     emoji: '',
      //     sign: '该健身了！'
      //   }
      // },
      // group: {
      //   1: {
      //     nick: '我的世界',
      //     avatar: 'avatar.png'
      //   }
      // }
    },
    // 存储关系
    relationship: [
      /*
        用户ID或群ID
        类型 | user/group
        备注
        分组名
        分组排序
        是否置顶
        是否在消息列表
        最后一条消息
        未读消息数
      */
      // {
      //   id: 1,
      //   type: 'user',
      //   remark: '',
      //   group: '特别关注',
      //   groupId: 0,
      //   top: 0,
      //   inchat: 1,
      //   lastMsg: '你好，在吗？',
      //   lastMsgNum: 5
      // },
      // {
      //   id: 2,
      //   type: 'user',
      //   remark: '',
      //   group: '我的好友',
      //   groupId: 1,
      //   top: 1,
      //   inchat: 1,
      //   lastMsg: '你好，在吗？',
      //   lastMsgNum: 5
      // },
      // {
      //   id: 3,
      //   type: 'user',
      //   remark: '',
      //   group: '我的好友',
      //   groupId: 1,
      //   top: 1,
      //   inchat: 1,
      //   lastMsg: '你好，在吗？',
      //   lastMsgNum: 5
      // },
      // {
      //   id: 1,
      //   type: 'group',
      //   remark: '',
      //   group: '我的群聊',
      //   groupId: 0,
      //   top: 0,
      //   inchat: 1,
      //   lastMsg: '你好，在吗？',
      //   lastMsgNum: 5
      // }
    ],
    showPicList: []
  },
  mutations: {
    showChat (state, payload) {
      state.nowChatId = payload.id
      state.nowChatType = payload.type
    },
    sendMsg (state, payload) {
      const chat = state.chatDB[state.nowChatType][state.nowChatId]
      if (chat.slice(-1)[0] && chat.slice(-1)[0].from === state.id) {
        chat[chat.length - 1].content.push({ type: 'text', content: payload.content, time: payload.time })
      } else {
        chat.push({
          type: 'message',
          from: state.id,
          time: payload.time,
          content: [
            { type: 'text', content: payload.content, time: payload.time }
          ]
        })
      }
    },
    getMsg (state, payload) {
      if (!state.chatDB[payload.type][payload.id]) {
        Vue.set(state.chatDB.user, payload.id, [])
      }
      const chat = state.chatDB[payload.type][payload.id]
      if (chat.slice(-1)[0] && chat.slice(-1)[0].from === payload.id) {
        chat[chat.length - 1].content.push({ type: 'text', content: payload.content, time: payload.time })
      } else {
        chat.push({
          type: 'message',
          from: payload.from || payload.id,
          time: payload.time,
          content: [
            { type: 'text', content: payload.content, time: payload.time }
          ]
        })
      }
      // 修改关系
      const index = _.findIndex(state.relationship, { id: payload.id })
      const info = { inChat: true, lastMsg: payload.content, lastActiveTime: payload.time }
      if (state.nowChatId !== payload.id) {
        info.lastMsgNum = state.relationship[index].lastMsgNum + 1
      }
      Vue.set(state.relationship, index, {
        ...state.relationship[index],
        ...info
      })
    },
    getCardMsg (state, payload) {
      // payload.id 发送人id
      if (!state.chatDB.user[payload.id]) {
        Vue.set(state.chatDB.user, payload.id, [])
      }
      // 存入附加联系人信息
      state.include.user[payload.content.id] = payload.include
      if (payload.content.groupId) {
        state.include.group[payload.content.groupId] = payload.groupInclude
      }
      // 修改联系人列表状态并发送
      const chat = state.chatDB.user[payload.id]
      const index = _.findIndex(state.relationship, { id: payload.id })
      const info = { inChat: true, lastActiveTime: payload.time }
      let status = ''
      if (payload.content.type === 'friendRes') {
        info.lastMsg = '收到了新的好友请求'
      } else if (payload.content.type === 'friendReq') {
        info.lastMsg = '发送了新的好友请求'
        status = '等待验证中'
      } else if (payload.content.type === 'groupRes') {
        info.lastMsg = '收到了新的入群邀请'
      } else if (payload.content.type === 'groupReq') {
        info.lastMsg = '发送了新的入群邀请'
        status = '等待验证中'
      }
      if (state.nowChatId !== payload.id) {
        info.lastMsgNum = state.relationship[index].lastMsgNum + 1
      }
      Vue.set(state.relationship, index, {
        ...state.relationship[index],
        ...info
      })
      // 推送卡片信息
      chat.push({
        type: 'card',
        time: payload.time,
        content: payload.content,
        status: status
      })
    },
    updateCardMsg (state, payload) {
      const chat = state.chatDB.user[payload.id]
      const index = _.findIndex(chat, {
        time: payload.time
      })
      const update = payload.update
      Vue.set(state.chatDB.user[payload.id], index, {
        ...chat[index],
        ...update
      })
    },
    setId (state, payload) {
      state.id = payload._id
      state.userData = {
        avatar: payload.avatar,
        nick: payload.nick,
        online: payload.online,
        emoji: payload.emoji,
        sign: payload.sign
      }
    },
    setRelation (state, payload) {
      state.relationship = payload
    },
    setRelationInfo (state, payload) {
      const index = _.findIndex(state.relationship, { id: payload.id })
      Vue.set(state.relationship, index, {
        ...state.relationship[index],
        ...payload.content
      })
    },
    setInclude (state, payload) {
      state.include = payload
    },
    setChatDB (state, payload) {
      Vue.set(state.chatDB[payload.type], payload.id, [])
    },
    setPicList (state, payload) {
      state.showPicList = payload
    },
    clear (state) {
      state.id = ''
      state.nowChatId = ''
      state.nowChatType = ''
      state.chatDB = {
        user: {},
        group: {}
      }
      state.include = {}
      state.relationship = []
      state.showPicList = []
      state.userData = {}
    },
    getChatDB (state, payload) {
      state.chatDB = payload
    },
    addInclude (state, payload) {
      state.include[payload.type][payload.id] = payload.content
    },
    setShowPop (state, payload) {
      state.showPop = payload
    }
  },
  actions: {
    showChat (store, payload) {
      store.commit('showChat', payload)
    },
    sendMsg (store, payload) {
      store.commit('sendMsg', payload)
    },
    getMsg (store, payload) {
      store.commit('getMsg', payload)
    },
    getCardMsg (store, payload) {
      store.commit('getCardMsg', payload)
    },
    updateCardMsg (store, payload) {
      store.commit('updateCardMsg', payload)
    },
    setId (store, payload) {
      store.commit('setId', payload)
    },
    setRelation (store, payload) {
      store.commit('setRelation', payload)
    },
    setRelationInfo (store, payload) {
      store.commit('setRelationInfo', payload)
    },
    setInclude (store, payload) {
      store.commit('setInclude', payload)
    },
    setChatDB (store, payload) {
      store.commit('setChatDB', payload)
    },
    setPicList (store, payload) {
      store.commit('setPicList', payload)
    },
    clear (store) {
      store.commit('clear')
    },
    getChatDB (store, payload) {
      store.commit('getChatDB', payload)
    },
    addInclude (store, payload) {
      store.commit('addInclude', payload)
    },
    setShowPop (store, payload) {
      store.commit('setShowPop', payload)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
})
