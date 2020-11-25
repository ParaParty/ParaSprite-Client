<template>
  <div class="viewer" v-viewer="options">
    <img src="@/assets/avatar2.png" alt="">
  </div>
</template>

<script>
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
