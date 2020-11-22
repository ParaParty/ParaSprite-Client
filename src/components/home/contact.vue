<template>
  <div class="contact">
    <contactSearch/>
    <contactList/>
  </div>
</template>

<script>
import contactSearch from '@/components/home/contactSearch.vue'
import contactList from '@/components/home/contactList.vue'
export default {
  components: {
    contactSearch,
    contactList
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .contact
    width: 14em
    height: 100vh
    background: $block-bg
    display: flex
    flex-direction: column
    align-items: center
</style>
