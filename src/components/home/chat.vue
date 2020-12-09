<template>
  <div class="chat">
    <div class="chat-title">
      <i class="iconfont icon-xiaoxi"></i>
      <h1>{{nowChatType == 'user' ? include.user[nowChatId].nick : include.group[nowChatId].nick}}</h1>
    </div>
    <chatContent ref="chat"/>
    <editor/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import chatContent from '@/components/home/chatContent.vue'
import editor from '@/components/home/editor.vue'
export default {
  components: {
    chatContent,
    editor
  },
  computed: {
    ...mapState(['nowChatType', 'nowChatId', 'include'])
  },
  sockets: {
    // 测试发送
    message (msg) {
      console.log(msg)
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .chat
    width: 100%
    height: 100%
  // 顶部栏
  .chat-title
    position: absolute
    display: flex
    width: calc(100% - 0.2em)
    color: var(--text)
    height: 5em
    padding: 1em
    background: linear-gradient(to bottom, var(--bg), transparent)
    z-index: 1
    i
      font-size: 1.5em
      opacity: 0.5
    h1
      font-size: 1em
      margin-left: 0.5em
</style>
