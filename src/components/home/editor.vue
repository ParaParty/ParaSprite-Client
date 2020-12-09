<template>
  <div class="editor">
    <StaticPicker :data="emojiIndex" title="表情…" emoji="grinning" color="var(--dark)" perLine="8" :i18n="emojii18n" set="twitter" id="picker" />
    <div class="content">
      <a class="emoji">
        <emoji :data="emojiIndex" set="twitter" emoji=":grinning:" :size="22" />
      </a>
      <textarea v-model="input" name="" id=""></textarea>
    </div>
    <a @click="send" class="send">
      <i class="iconfont icon-send"></i>
    </a>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import 'tippy.js/animations/scale.css'
// import 'tippy.js/dist/tippy.css'
import data from 'emoji-mart-vue-fast/data/all.json'
import { Emoji, StaticPicker, EmojiIndex } from 'emoji-mart-vue-fast'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
export default {
  components: {
    StaticPicker,
    Emoji
  },
  data () {
    return {
      emojiIndex: new EmojiIndex(data),
      emojii18n: {
        search: '搜索……',
        notfound: '搜索不到符合的表情结果',
        categories: {
          search: '',
          recent: '最近使用',
          smileys: '表情',
          people: '人物',
          nature: '自然',
          foods: '事物',
          activity: '动态',
          places: '地点',
          objects: '物体',
          symbols: '符号',
          flags: '国旗',
          custom: '自定义'
        }
      },
      input: ''
    }
  },
  methods: {
    send () {
      this.$socket.emit('message', this.input)
    }
  },
  mounted () {
    const emojiPicker = document.getElementById('picker')
    tippy('.emoji', {
      content: emojiPicker,
      trigger: 'click',
      animation: 'scale',
      interactive: true
    })
  }
}
</script>

<style lang="sass" scoped>

  .editor
    display: flex
    align-items: flex-end
    position: absolute
    bottom: 0
    left: 0
    right: 0
    height: 5em
    padding: 1em
    background: linear-gradient(to top, var(--bg), transparent)
    width: calc(100% - 0.2em)
  .content
    display: flex
    width: 100%
    height: 2em
    align-items: center
    textarea
      width: 100%
      height: 2.5em
      outline: none
      padding: 0.5em
      border: 1px solid transparent
      border-radius: 0.2em
      background: rgba(245, 245, 245, 0.6)
      margin: 0px
      resize: none
      font-family: 'Microsoft Yahei'
      backdrop-filter: blur(2px)
      transition: border .3s
      &:hover, &:focus
        border: 1px solid var(--dark)
    ::v-deep .tippy-box
      outline: none
  .send
    display: flex
    justify-content: center
    align-items: center
    background: #45c31c
    width: 4em
    height: 2em
    border-radius: 0.2em
    margin-left: 0.5em
    color: #fff
  .emoji
    position: absolute
    z-index: 1
    right: 0.5rem
    font-size: 1.2em
    filter: grayscale(1)
    opacity: 0.5
    transition: filter .3s, opacity .3s
    &:hover
      filter: grayscale(0) !important
      opacity: 1 !important
  #picker ::v-deep
    width: 306px !important
    .emoji-mart-search
      margin-top: 0.5em
      padding: 0 0.5em
    .emoji-mart-category-label
      position: sticky
    .emoji-mart-search input
      border-radius: 0.2em
      padding: 0.5em
    .emoji-mart-category-label
      top: -1px
    .emoji-mart-category-label span
      color: var(--text)
      font-weight: bold
      font-size: 0.8em
      padding: 0.5em
    .emoji-mart-scroll
      &::-webkit-scrollbar
        width: 4px
      &::-webkit-scrollbar-thumb
        background: rgba(0, 0, 0, 0.2)
</style>
