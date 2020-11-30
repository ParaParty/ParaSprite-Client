<template>
  <div id="app">
    <titleBar/>
    <sidebar/>
    <transition name="show">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import titleBar from '@/components/titleBar.vue'
import sidebar from '@/components/sidebar.vue'
export default {
  components: {
    titleBar,
    sidebar
  },
  mounted () {
    // fetch('http://localhost:8888/echo/test')
    //   .then(function (response) {
    //     return response.json()
    //   })
    //   .then(function (myJson) {
    //     console.log(myJson)
    //   })
    // this.$socket.emit('my other event', {
    //   abc: 123
    // })
  }
}
</script>

<style lang="sass">
  @import url('//at.alicdn.com/t/font_2176265_ua72vqacgmq.css')
  @import "~@/assets/color.sass"
  *, *:after, *:before
    position: relative
    box-sizing: border-box
    margin: 0
    padding: 0
  body
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1)
  #app
    display: flex
    background: $bg
    user-select: none
    overflow: hidden
    // filter: invert(1) hue-rotate(180deg)
  i
    text-shadow: none
  // 图片查看部分
  .viewer-backdrop
    background: $block-bg !important
    z-index: 1 !important
  .viewer-fullscreen
    display: none
  .viewer-toolbar > ul > li
    background-color: $dark
    border-radius: 2px !important
    margin: 0 2px
    opacity: 0.5
  .viewer-navbar
    background-color: $dark
    opacity: 0.5
  .contextmenu
    padding: 0 !important
    .menu_body
      margin: 0.5em
      .menu_item
        border-radius: 0.2em
        color: $text
        &:hover
          background: $hover-bg
          color: $text
      .menu_item__divided
        margin-bottom: 10px
        border: none
        &::after
          content: ''
          display: block
          width: 100%
          position: absolute
          bottom: -5px
          left: 0
          border-bottom: 1px solid $active-bg
  // 路由过渡
  .show-enter-active, .show-leave-active
    transition: all .3s
  .show-enter, .show-leave-to
    position: absolute
    width: calc(100vw - 4em)
    left: 4em
    transform: scale(1.05)
    opacity: 0
</style>
