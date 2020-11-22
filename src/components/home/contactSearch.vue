<template>
  <div class="contact-search">
    <input v-model="input" @focus="open" @blur="close" placeholder="搜索……" type="text">
    <div :class="[show ? 'show' : '', 'content']">
      <div v-if="input" class="search">
        <div class="search-box">
          <p class="title">联系人</p>
          <ul class="contact">
            <li>
              <img src="@/assets/avatar.png" alt="">
              <p>陆陆侠</p>
            </li>
            <li>
              <img src="@/assets/avatar.png" alt="">
              <p>陆陆侠</p>
            </li>
          </ul>
        </div>
        <div class="search-box">
          <p class="title">群聊</p>
          <ul class="contact">
            <li>
              <img src="@/assets/avatar.png" alt="">
              <p>陆陆侠</p>
            </li>
            <li>
              <img src="@/assets/avatar.png" alt="">
              <p>陆陆侠</p>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="empty">
        <p class="empty-hit">搜索联系人、群聊、收藏、聊天记录以及更多……</p>
        <img src="@/assets/img/search.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      show: 0
    }
  },
  methods: {
    open () {
      this.show = 1
    },
    close () {
      this.show = 0
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~@/assets/color.sass"
.contact-search
  width: 100%
  padding: 1em
  padding-bottom: 0
input
  outline: none
  padding: 0.5em
  border: none
  width: 100%
  border: 1px solid transparent
  border-radius: 0.2em
  transition: border 0.3s
  -webkit-app-region: no-drag
  z-index: 2
  &:hover, &:focus
    border: 1px solid $dark
.content
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 20em
  border-radius: 0.2em
  border: 1px solid #ddd
  background: $bg
  z-index: 1
  opacity: 0
  pointer-events: none
  transition: opacity 0.3s
  .search, .empty
    position: absolute
    width: 100%
    bottom: 0
    display: flex
    flex-direction: column
    height: calc(100% - 4em)
    padding: 0 1.2em
    color: $text
    font-size: 0.8em
    .search-box
      background: $block-bg
      padding: 0.5em
      border-radius: 0.2em
      margin-top: 1em
    .title
      margin-bottom: 0.5em
      font-weight: bold
      opacity: 0.8
  .empty
    align-items: center
  .empty-hit
    margin-top: 0.5em
.contact
  li
    display: flex
    align-items: center
    padding: 0.2em 0.5em
    border-radius: 0.2em
    img
      width: 1.75em
      height: 1.75em
      border-radius: 1em
      margin-right: 0.5em
    &:hover
      background: $hover-bg
.show
  opacity: 1
  pointer-events: all
</style>
