<template>
  <div class="viewer" v-viewer.rebuild="options">
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
        initialViewIndex: this.$route.hash.slice(1),
        viewed (e) {
          this.viewer.full()
        }
      }
    }
  },
  computed: {
    ...mapState(['showPicList'])
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
