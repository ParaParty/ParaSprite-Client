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
    const remoteVideo = document.querySelector('#remoteVideo')
    const servers = null
    const localPeer = new RTCPeerConnection(servers)
    const remotePeer = new RTCPeerConnection(servers)
    localPeer.onicecandidate = e => {
      console.log(e.candidate && e.candidate)
      e.candidate && remotePeer.addIceCandidate(e.candidate)
    }
    remotePeer.onicecandidate = e => {
      e.candidate && localPeer.addIceCandidate(e.candidate)
    }
    remotePeer.addEventListener('addstream', e => {
      remoteVideo.srcObject = e.stream
    })
    // 获取本地视频流
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(stream => {
      localVideo.srcObject = stream
      localPeer.addStream(stream)
      localPeer.createOffer({
        offerToReceiveVideo: 1
      }).then((description) => {
        console.log(description)
        localPeer.setLocalDescription(description)
        remotePeer.setRemoteDescription(description)
        remotePeer.createAnswer().then((description) => {
          remotePeer.setLocalDescription(description)
          localPeer.setRemoteDescription(description)
        })
      })
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
