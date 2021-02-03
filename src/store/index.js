import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    nowChatId: null,
    nowChatType: null,
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
      user: {
        0: {
          nick: '陆陆侠',
          avatar: 'avatar2.png',
          online: 0,
          emoji: '📢',
          sign: 'SB————'
        },
        1: {
          nick: '槕纸喵',
          avatar: 'avatar.png',
          online: 0,
          emoji: '🐟',
          sign: '摸鱼中'
        },
        2: {
          nick: '李亮亮',
          avatar: 'avatar2.png',
          online: 1,
          emoji: '',
          sign: ''
        },
        3: {
          nick: '剑羽',
          avatar: 'avatar2.png',
          online: 1,
          emoji: '',
          sign: '该健身了！'
        }
      },
      group: {
        1: {
          nick: '我的世界',
          avatar: 'avatar.png'
        }
      }
    },
    // 存储关系
    relationship: [
      /*
        用户ID或群ID
        状态
        类型 | user/group
        备注
        分组名
        分组排序
        是否置顶
        是否在消息列表
        最后一条消息
        未读消息数
      */
      {
        id: 1,
        status: 1,
        type: 'user',
        remark: '',
        group: '特别关注',
        groupId: 0,
        top: 0,
        inchat: 1,
        lastMsg: '你好，在吗？',
        lastMsgNum: 5
      },
      {
        id: 2,
        status: 1,
        type: 'user',
        remark: '',
        group: '我的好友',
        groupId: 1,
        top: 1,
        inchat: 1,
        lastMsg: '你好，在吗？',
        lastMsgNum: 5
      },
      {
        id: 3,
        status: 1,
        type: 'user',
        remark: '',
        group: '我的好友',
        groupId: 1,
        top: 1,
        inchat: 1,
        lastMsg: '你好，在吗？',
        lastMsgNum: 5
      },
      {
        id: 1,
        status: 1,
        type: 'group',
        remark: '',
        group: '我的群聊',
        groupId: 0,
        top: 0,
        inchat: 1,
        lastMsg: '你好，在吗？',
        lastMsgNum: 5
      }
    ]
  },
  mutations: {
    showChat (state, payload) {
      state.nowChatId = payload.id
      state.nowChatType = payload.type
    },
    sendMsg (state, payload) {
      const chat = state.chatDB[state.nowChatType][state.nowChatId]
      if (chat.slice(-1)[0].from === state.id) {
        chat[chat.length - 1].content.push({ type: 'text', content: payload })
      } else {
        state.chatDB[state.nowChatType][state.nowChatId].push({
          type: 'message',
          from: state.id,
          content: [
            { type: 'text', content: payload }
          ]
        })
      }
    },
    setId (state, payload) {
      state.id = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
