<template>
  <div class="contact">
    <contactSearch/>
    <contactList/>
    <userInfo/>
  </div>
</template>

<script>
import contactSearch from '@/components/home/contactSearch.vue'
import contactList from '@/components/home/contactList.vue'
import userInfo from '@/components/home/userInfo.vue'
export default {
  components: {
    contactSearch,
    contactList,
    userInfo
  }
}
</script>

<style lang="sass" scoped>
  .contact
    width: 14em
    height: 100vh
    background: var(--block-bg)
    display: flex
    flex-direction: column
    align-items: center
</style>
