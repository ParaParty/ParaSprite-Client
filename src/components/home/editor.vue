<template>
  <div class="editor">
    <StaticPicker @select="selectEmoji" :data="emojiIndex" title="表情…" emoji="grinning" color="var(--dark)" :i18n="emojii18n" set="twitter" id="picker" />
    <div class="content">
      <a class="emoji">
        <img src="/emoji/1f600.svg" alt="">
      </a>
      <div class="input">
      </div>
      <!-- <textarea v-model="input" name="" id="input"></textarea> -->
    </div>
    <a @click="send" class="send">
      <i class="iconfont icon-send"></i>
    </a>
  </div>
</template>

<script>
// 导入提示组件
import tippy from 'tippy.js'
import 'tippy.js/animations/scale.css'
// import 'tippy.js/dist/tippy.css'
// 导入表情组件
import data from 'emoji-mart-vue-fast/data/all.json'
import { StaticPicker, EmojiIndex } from 'emoji-mart-vue-fast'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
// 导入vuex
import { mapMutations } from 'vuex'
export default {
  components: {
    StaticPicker
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
      }
    }
  },
  methods: {
    ...mapMutations(['sendMsg']),
    send () {
      // this.$socket.emit('message', this.input)
      const payload = document.querySelector('.input').innerHTML
      this.sendMsg(payload)
      this.$forceUpdate()
    },
    selectEmoji (emoji) {
      // 聚焦输入框
      const input = document.querySelector('.input')
      input.focus()
      // 获取光标
      const selection = document.getSelection()
      // 创建表情
      let code = emoji.unified
      if (code.slice(-5) === '-fe0f' && code.length < 11) {
        code = code.slice(0, -5)
      }
      const img = document.createElement('img')
      img.src = `/emoji/${code}.svg`
      img.classList.add('emoji')
      img.draggable = false
      img.alt = `${emoji.native}`
      // 当前选中了内容
      if (selection.anchorNode) {
        const range = selection.getRangeAt(0)
        range.insertNode(img)
        range.collapse(0)
      } else {
        // 当前未选中内容
        input.append(img)
      }
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
    font-family: emoji
  .content
    display: flex
    width: 100%
    height: 2.4em
    align-items: center
    .input
      position: absolute
      bottom: 0
      width: 100%
      height: fit-content
      max-height: 5em
      outline: none
      padding: 0.5em
      border: 1px solid transparent
      border-radius: 0.2em
      color: var(--text)
      background: var(--input)
      backdrop-filter: blur(2px)
      transition: border .3s
      overflow-y: auto
      -webkit-user-modify: read-write
      &::-webkit-scrollbar
        width: 4px
      &::-webkit-scrollbar-thumb
        background: rgba(0, 0, 0, 0.2)
      &:hover, &:focus
        border: 1px solid var(--dark)
      ::v-deep .emoji
        width: 1.3em
        height: 1.3em
        vertical-align: sub
    ::v-deep .tippy-box
      outline: none
  .send
    display: flex
    justify-content: center
    align-items: center
    background: #45c31c
    width: 2.6em
    height: 2.4em
    border-radius: 0.2em
    margin-left: 0.5em
    color: #fff
    cursor: pointer
    &:hover i
        transform: scale(1.5)
    i
      transition: transform 0.3s
  .emoji
    position: absolute
    z-index: 1
    right: 0.5rem
    height: 1.5em
    filter: grayscale(1)
    opacity: 0.5
    transition: filter .3s, opacity .3s
    cursor: pointer
    &:hover
      filter: grayscale(0) !important
      opacity: 1 !important
    img
      width: 1.5em
      height: 1.5em
  #picker ::v-deep
    width: 306px !important
    .emoji-mart-emoji, .emoji-type-image, .emoji-mart-anchor, .emoji-mart-skin-swatches
      cursor: pointer
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
