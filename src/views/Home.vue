<template>
  <div class="home">
    <contact/>
    <chat/>
    <intro/>
    <chatInfo/>
  </div>
</template>

<script>
import contact from '@/components/home/contact.vue'
import chat from '@/components/home/chat.vue'
import intro from '@/components/home/intro.vue'
import chatInfo from '@/components/home/chatInfo.vue'

export default {
  name: 'Home',
  components: {
    contact,
    chat,
    intro,
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
