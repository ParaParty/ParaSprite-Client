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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    contact,
    chat,
    intro,
    chatInfo
  },
  computed: {
    ...mapState(['nowChatId'])
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
