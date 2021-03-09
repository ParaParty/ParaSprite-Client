<template>
  <div class="viewer" v-viewer="options">
    <img v-for="(src, index) in showPicList" :key="index" :src="src" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      options: {
        inline: true,
        title: false,
        viewed (e) {
          this.viewer.full()
        }
      }
    }
  },
  computed: {
    ...mapState(['showPicList'])
  },
  mounted () {
    console.log(this.showPicList)
  }
}
</script>

<style lang="sass" scoped>
  .viewer
    height: 100vh
    width: 100%
  img
    display: none
</style>
