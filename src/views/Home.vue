<template>
  <div class="home">
    <contact/>
    <div class="content">
      <transition name="chat">
        <chat v-if="nowChatId"/>
      </transition>
      <intro/>
    </div>
    <chatInfo/>
  </div>
</template>

<script>
import contact from '@/components/home/contact.vue'
import chat from '@/components/home/chat.vue'
import intro from '@/components/home/intro.vue'
import chatInfo from '@/components/home/chatInfo.vue'
import { mapState, mapActions } from 'vuex'
import { remote } from 'electron'
import Dexie from 'dexie'

export default {
  name: 'Home',
  components: {
    contact,
    chat,
    intro,
    chatInfo
  },
  computed: {
    ...mapState(['nowChatId', 'id', 'chatDB'])
  },
  sockets: {
    getMsg (data) {
      this.getMsg(data)
      if (this.nowChatId === data.id) {
        const chatContent = document.querySelector('.chat-content')
        if (Math.ceil(chatContent.scrollTop) - (chatContent.scrollHeight - chatContent.clientHeight) < 5) {
          setTimeout(() => {
            chatContent.scrollTop = chatContent.scrollHeight
          }, 0)
        }
      } else {
        this.$socket.emit('addLastMsgNum', { id: data.id })
      }
    },
    getCardMsg (data) {
      this.getCardMsg(data)
      if (this.nowChatId !== data.id) {
        this.$socket.emit('addLastMsgNum', { id: data.id })
      }
    },
    updateCardMsg (data) {
      this.updateCardMsg(data)
    },
    updateRelation () {
      this.updateRelation()
    }
  },
  methods: {
    ...mapActions(['setRelation', 'setInclude', 'getMsg', 'getCardMsg', 'updateCardMsg', 'getChatDB']),
    updateRelation () {
      // 初始化联系人列表
      const relationship = []
      const include = { user: {}, group: {} }
      this.axios.get('/api/get').then(res => {
        res.data.forEach(item => {
          const relation = {
            id: item.relationId,
            type: item.type,
            remark: item.remark,
            group: item.group,
            groupId: item.groupId,
            top: item.top,
            inChat: item.inChat,
            lastMsg: item.lastMsg,
            lastMsgNum: item.lastMsgNum,
            lastActiveTime: item.lastActiveTime
          }
          relationship.push(relation)
          if (item.type === 'user') {
            const user = {
              nick: item.include[0].nick,
              avatar: item.include[0].avatar,
              online: item.include[0].online,
              emoji: item.include[0].emoji,
              sign: item.include[0].sign
            }
            include.user[item.include[0]._id] = user
          } else if (item.type === 'group') {
            const group = {
              nick: item.include[0].nick,
              avatar: item.include[0].avatar,
              intro: item.include[0].intro
            }
            include.group[item.include[0]._id] = group
          }
        })
        this.setInclude(include)
        this.setRelation(relationship)
      })
    }
  },
  mounted () {
    this.updateRelation()
    const db = new Dexie('db')
    db.version(1).stores({
      chat: 'id, content'
    })
    db.open()
    // db.close()
    setTimeout(() => {
      db.chat.get(this.id).then(e => {
        if (e && e.content) {
          this.getChatDB(e.content)
        }
      })
    }, 0)
    remote.getCurrentWindow().on('close', () => {
      db.chat.put({ id: this.id, content: this.chatDB })
    })
    setTimeout(() => {
      // 获取未读消息
      this.axios.get('/api/message').then(res => {
        res.data.forEach(msg => {
          console.log(msg)
          if (msg.type === 'msg') {
            this.getMsg(msg.content)
          } else if (msg.type === 'cardMsg') {
            this.getCardMsg(msg.content)
          } else if (msg.type === 'updateCardMsg') {
            this.updateCardMsg(msg.content)
          }
        })
      })
    }, 1000)
  },
  beforeDestroy () {
    const db = new Dexie('db')
    db.version(1).stores({
      chat: 'id, content'
    })
    db.open()
    db.chat.put({ id: this.id, content: this.chatDB })
  }
}
</script>

<style lang="sass" scoped>
  .home
    display: flex
    width: calc(100% - 4em)
    height: 100vh
  .content
    width: calc(100% - 14em)
  // 聊天窗口过渡
  .chat-enter-active, .chat-leave-active
    transition: all .3s
  .chat-enter, .chat-leave-to
    z-index: 1
    left: 0
    transform: translate(-1em, 0)
    opacity: 0
</style>
