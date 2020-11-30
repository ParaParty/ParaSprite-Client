<template>
  <div v-if="$route.name != 'PicViewer'" class="sidebar">
    <ul class="menu">
      <li class="active">
        <i class="iconfont icon-shouye"></i>
      </li>
      <li>
        <i class="iconfont icon-xingqiu"></i>
      </li>
      <li class="setting">
        <i class="iconfont icon-shezhi"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .sidebar
    width: 4em
    height: 100vh
    background: #fff
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
      color: $text
      text-align: center
      list-style: none
      background: $block-bg
      &:hover
        background: $hover-bg
    i
      font-size: 1.5em
  .active
    background: $main !important
    color: $bg !important
    i
      font-size: 1em
  .setting
    position: absolute
    bottom: 0
</style>
