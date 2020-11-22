<template>
  <div class="title-bar">
    <ul class="btns">
      <li @click="minimize">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect fill="currentColor" width="10" height="1" x="1" y="6"></rect></svg>
      </li>
      <li @click="maximize">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect></svg>
      </li>
      <li @click="close" class="close">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1" stroke="black" stroke-width="1"></polygon></svg>
      </li>
    </ul>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  methods: {
    minimize () {
      ipcRenderer.send('minimize')
    },
    maximize () {
      ipcRenderer.send('maximize')
    },
    close () {
      ipcRenderer.send('close')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .title-bar
    position: absolute
    height: 2em
    width: 100vw
    margin-top: 0.2em
    -webkit-app-region: drag
    z-index: 2
  .btns
    position: absolute
    right: 0
    top: -0.2em
    height: 100%
    -webkit-app-region: no-drag
    li
      display: inline-flex
      justify-content: center
      align-items: center
      height: 100%
      width: 3em
      color: $text
      opacity: 0.5
      transition: all 0.3s
      &:hover
        background: $hover-bg
        opacity: 1
  .close
    polygon
      stroke: $text
      color: transparent
      opacity: 0.9
    &:hover
      background: #d02055 !important
      color: #000 !important
      polygon
        stroke: #fff
</style>
