<template>
  <div v-if="['login', 'home'].includes($route.name)" class="sidebar">
    <ul class="menu">
      <li class="active">
        <i class="iconfont icon-shouye"></i>
      </li>
      <li>
        <i class="iconfont icon-xingqiu"></i>
      </li>
      <li @click="test" class="setting">
        <i class="iconfont icon-shezhi"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    test () {
      this.$router.push('/')
      this.$socket.disconnect()
    }
  }
}
</script>

<style lang="sass" scoped>
  .sidebar
    width: 4em
    height: 100vh
    background: var(--bg)
    z-index: 1
  .menu
    display: flex
    align-items: center
    flex-direction: column
    height: 100%
    li
      width: 2.5em
      height: 2.5em
      border-radius: 2em
      line-height: 2.5em
      margin: 0.5em 0
      color: var(--text)
      text-align: center
      list-style: none
      background: var(--block-bg)
      &:hover
        background: var(--hover-bg)
    i
      font-size: 1.5em
  .active
    background: var(--main) !important
    color: var(--bg) !important
    i
      font-size: 1em
  .setting
    position: absolute
    bottom: 0
</style>
