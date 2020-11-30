<template>
  <div class="logo">
    <div class="part1">
      <div class="block1"></div>
      <div class="block2"></div>
    </div>
    <div class="part2">
      <div class="block3">
        <div class="eye1"></div>
        <div class="eye2"></div>
      </div>
    </div>
    <div class="part3">
      <div class="block1"></div>
      <div class="block2"></div>
    </div>
    <div class="part4">
      <div class="block1"></div>
      <div class="block2"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  .logo
    display: flex
    flex-wrap: wrap
    width: 8em
    height: 8em
  .part1, .part2, .part3, .part4
    width: 4em
    height: 4em
  .block1, .block2
    position: absolute
    width: 2em
    height: 2em
    background: #000
    bottom: 0
    right: 0
    border-radius: 2px
  .block1
    transform: skewX(45deg)
    transform-origin: right bottom
    right: 2px
  .block2
    transform: skewY(45deg)
    transform-origin: right bottom
    bottom: 2px
  .part3
    transform: rotate(-90deg)
    top: 2px
  .part4
    transform: rotate(180deg)
    top: 2px
    left: 2px
  .block3
    background: #000
    width: 3em
    height: 2em
    position: absolute
    bottom: 0
    left: 2px
    border-radius: 2px 2px 0 2px
    &::after
      content: ""
      width: 0.8em
      height: 0.8em
      top: 100%
      display: block
      background: linear-gradient(45deg, #fff 49%, black 50%)
      left: calc(100% - 0.8em)
      border-radius: 0 0 2px 0
  .eye1, .eye2
    position: absolute
    width: 0.3em
    height: 0.8em
    top: 0.5em
    background: #fff
  .eye1
    left: 0.5em
  .eye2
    left: 1.5em
</style>
