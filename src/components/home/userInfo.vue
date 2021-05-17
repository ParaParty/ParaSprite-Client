<template>
  <div class="user">
    <div class="avatar">
      <img :src='`https://api.multiavatar.com/${id}.png`' alt="">
    </div>
    <div class="info">
      <p @click="setShowPop('changeName')" class="nick">{{userData.nick}}</p>
      <p @click="setShowPop('changeSign')" class="content">{{userData.sign ? userData.sign : '这个人很懒，什么都没有写'}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['id', 'userData'])
  },
  methods: {
    ...mapActions(['setShowPop'])
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
  .info p
    cursor: pointer
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
