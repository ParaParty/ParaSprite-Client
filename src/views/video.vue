<template>
  <div class="video">
    <iframe :src="`http://127.0.0.1:7777/p2p?type=${this.$route.hash.slice(1)}`" allow="microphone; camera; midi; encrypted-media;" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  .video
    display: flex
    justify-content: center
    align-items: center
    background: var(--block-bg)
    width: 100vw
    iframe
      width: 100%
      height: 100%
  #localVideo
    position: absolute
    bottom: 1em
    right: 1em
    border-radius: 0.2em
    height: 10em
    overflow: hidden
  #remoteVideo
    height: 100vh
</style>
