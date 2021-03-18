<template>
  <div class="user">
    <div class="avatar">
      <img src="@/assets/avatar.png" alt="">
    </div>
    <div class="info">
      <p class="nick">{{userData.nick}}</p>
      <p class="content">个性签名</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['id', 'userData'])
  }
}
</script>

<style lang="sass" scoped>
  .user
    width: 100%
    display: flex
    padding: 0.5em 1.5em
    background: var(--hover-bg)
  .avatar
    width: 2.5em
    height: 2.5em
    background: var(--hover-bg)
    border-radius: 2em
    img
      width: 100%
      height: 100%
      border-radius: 2em
  .info
    margin-left: 0.5em
    width: calc(100% - 3em)
  .nick
    color: var(--text)
    margin-bottom: 0.1em
  .content
    font-size: 0.8em
    opacity: 0.6
    color: var(--text)
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
</style>
