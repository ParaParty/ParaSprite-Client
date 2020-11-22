<template>
  <div id="app">
    <titleBar/>
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
import titleBar from '@/components/titleBar.vue'
import sidebar from '@/components/sidebar.vue'
export default {
  components: {
    titleBar,
    sidebar
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
    // filter: invert(1) hue-rotate(180deg)
  i
    text-shadow: none
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
</style>
