<template>
  <div class="contact-search">
    <div class="search-input">
      <input v-model="input" @focus="open" @blur="close" placeholder="搜索……" type="text">
      <a @click="showSearch" class="add"><i class="iconfont icon-add"></i></a>
    </div>
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
// import { ipcRenderer } from 'electron'
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
    },
    showSearch () {
      // TODO 考虑通过搜索添加好友
      // ipcRenderer.send('showSearch')
      this.axios.post('/api/users/add', {
        mail: this.input
      }).then(res => {
        this.$toast.showToast(`已向${this.input}发送好友请求！`)
      }).catch(err => {
        this.$toast.showToast(err.response.data.message)
      })
    }
  }
}
</script>

<style lang="sass" scoped>

.contact-search
  width: 100%
  padding: 1em
  padding-bottom: 0
.search-input
  display: flex
  align-items: center
  z-index: 2
input
  outline: none
  padding: 0.5em
  border: none
  width: 100%
  border: 1px solid transparent
  border-radius: 0.2em
  background: var(--bg)
  transition: border 0.3s
  -webkit-app-region: no-drag
  &:hover, &:focus
    border: 1px solid var(--dark)
.add
  position: absolute
  right: 0.5em
  opacity: 0.5
  cursor: pointer
  transform: opacity .3s
  &:hover
    opacity: 0.8
    input
      border: 1px solid var(--dark)
.content
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 20em
  border-radius: 0.2em
  border: 1px solid #ddd
  background: var(--bg)
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
    color: var(--text)
    font-size: 0.8em
    .search-box
      background: var(--block-bg)
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
      background: var(--hover-bg)
.show
  opacity: 1
  pointer-events: all
</style>
