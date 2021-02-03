<template>
  <div class="video">
    <video id="remoteVideo" autoplay playsinline></video>
    <video id="localVideo" autoplay muted playsinline></video>
  </div>
</template>

<script>
export default {
  mounted () {
    const localVideo = document.querySelector('#localVideo')
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(stream => {
      // localStream = stream;
      localVideo.srcObject = stream
      // sendMessage('got user media');
      // if (isInitiator) {
      //   maybeStart();
      // }
    })
  }
}
</script>

<style lang="sass" scoped>
  .video
    display: flex
    justify-content: center
    align-items: center
    background: var(--block-bg)
    width: 100vw
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
