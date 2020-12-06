<template>
  <div class="chat">
    <div class="chat-title">
      <i class="iconfont icon-xiaoxi"></i>
      <h1>陆陆侠</h1>
    </div>
    <chatContent ref="chat"/>
    <editor/>
  </div>
</template>

<script>
import chatContent from '@/components/home/chatContent.vue'
import editor from '@/components/home/editor.vue'
export default {
  components: {
    chatContent,
    editor
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
  @import "~@/assets/color.sass"
  .chat
    width: 100%
    height: 100%
  // 顶部栏
  .chat-title
    position: absolute
    display: flex
    width: calc(100% - 0.2em)
    color: $text
    height: 5em
    padding: 1em
    background: linear-gradient(to bottom, $bg, transparent)
    z-index: 1
    i
      font-size: 1.5em
      opacity: 0.5
    h1
      font-size: 1em
      margin-left: 0.5em
</style>
