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
    document.body.classList.add('light-theme')
    // fetch('http://localhost:8888/echo/test')
    //   .then(function (response) {
    //     return response.json()
    //   })
    //   .then(function (myJson) {
    //     console.log(myJson)
    //   })
  }
}
</script>

<style lang="sass">
  @import url('//at.alicdn.com/t/font_2176265_nwy447xtkqc.css')
  *, *:after, *:before
    position: relative
    box-sizing: border-box
    margin: 0
    padding: 0
  body
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1)
    // font-family: "PingFang SC"
  #app
    display: flex
    background: var(--bg)
    user-select: none
    overflow: hidden
    height: 100vh
    // filter: invert(1) hue-rotate(180deg)
  i
    text-shadow: none
  // 图片查看部分
  .viewer-backdrop
    background: var(--block-bg) !important
    z-index: 1 !important
  .viewer-fullscreen
    display: none
  .viewer-toolbar > ul > li
    background-color: var(--dark)
    border-radius: 2px !important
    margin: 0 2px
    opacity: 0.5
  .viewer-navbar
    background-color: var(--dark)
    opacity: 0.5
  .contextmenu
    padding: 0 !important
    .menu_body
      margin: 0.5em
      .menu_item
        border-radius: 0.2em
        color: var(--text)
        &:hover
          background: var(--hover-bg)
          color: var(--text)
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
          border-bottom: 1px solid var(--active-bg)
  // 路由过渡
  .show-enter-active, .show-leave-active
    transition: all .3s
  .show-enter, .show-leave-to
    position: absolute
    width: calc(100vw - 4em)
    left: 4em
    transform: scale(1.05)
    opacity: 0
  // 主题色
  .light-theme
    --bg: #fff
    --block-bg: #f5f5f5
    --hover-bg: #eee
    --active-bg: #ddd
    --dark: rgba(0, 0, 0, 0.5)
    --text: rgba(0, 0, 0, 0.7)
    --text-right: #fff
    --main: #ea5089
    --input: rgba(245, 245, 245, 0.6)
  .dark-theme
    --bg: #0d1117
    --block-bg: #161b22
    --hover-bg: #30363d
    --active-bg: #21262d
    --dark: rgba(255, 255, 255, 0.5)
    --text: rgb(201, 209, 217)
    --text-right: #fff
    --main: #ea5089
    --input: rgba(22, 27, 34, 0.6)
</style>
