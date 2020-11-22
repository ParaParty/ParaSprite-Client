<template>
  <div class="home">
    <contact/>
    <chat/>
    <chatInfo/>
  </div>
</template>

<script>
import contact from '@/components/home/contact.vue'
import chat from '@/components/home/chat.vue'
import chatInfo from '@/components/home/chatInfo.vue'

export default {
  name: 'Home',
  components: {
    contact,
    chat,
    chatInfo
  }
}
</script>

<style lang="sass" scoped>
  .home
    display: flex
    width: calc(100% - 4em)
    height: 100vh
</style>
