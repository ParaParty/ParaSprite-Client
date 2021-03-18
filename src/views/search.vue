<template>
  <div class="search">
    <div class="header">
      <ul>
        <li @click="choose(0)" :class="type == 0 ? 'active' : ''">添加好友</li>
        <li @click="choose(1)" :class="type == 1 ? 'active' : ''">公开群组</li>
      </ul>
      <div class="input">
        <input @keydown.enter="search" v-model="input" placeholder="昵称/邮箱" type="text">
        <i @click="search" class="iconfont icon-sousuo"></i>
      </div>
    </div>
    <div class="search-content">
      <p v-if="searchList.length" class="search-title">搜索到相关结果 {{searchList.length}} 个</p>
      <ul class="search-list">
        <li @click="add(item.mail)" v-for="item in searchList" :key="item._id" class="item">
          <div class="hover">
            <i class="iconfont icon-add"></i>
            <p>添加好友</p>
          </div>
          <div class="avatar">
            <img :src="`https://api.multiavatar.com/${item._id}.png`" alt="">
          </div>
          <div class="info">
            <p class="nick">{{item.nick}}</p>
            <p class="content">{{item.sign}}</p>
          </div>
        </li>
        <!-- <li class="item">
          <div class="hover">
            <i class="iconfont icon-add"></i>
            <p>添加好友</p>
          </div>
          <div class="avatar">
            <img src="@/assets/avatar.png" alt="">
          </div>
          <div class="info">
            <p class="nick">用户名</p>
            <p class="content">个性签名</p>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 0,
      input: '',
      searchList: []
    }
  },
  methods: {
    choose (i) {
      this.type = i
    },
    search () {
      this.axios.post('/api/users/search', {
        input: this.input
      }).then(res => {
        this.searchList = res.data
      })
    },
    add () {
      this.axios.get('/api/test')
      // this.axios.post('/api/users/add', {
      //   mail: mail
      // }).then(res => {
      //   this.$toast.showToast(`已向${this.input}发送好友请求！`)
      //   this.getCardMsg({
      //     id: res.data.userId,
      //     time: res.data.time,
      //     content: res.data.content,
      //     include: res.data.include
      //   })
      // }).catch(err => {
      //   this.$toast.showToast(err.response.data.message)
      // })
    }
  },
  mounted () {
    if (this.$route.hash) {
      this.input = this.$route.hash.slice(1)
      this.search()
    }
  }
}
</script>

<style lang="sass" scoped>
  .header
    width: 100vw
    height: 10em
    background: var(--block-bg)
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    li
      list-style: none
      display: inline-block
      padding: 0.5em
      font-weight: bold
      border-radius: 0.2em
      margin: 0 0.5em
      &:hover
        background: var(--hover-bg)
  .active
    background: var(--active-bg) !important
    pointer-events: none
  .input
    display: flex
    align-items: center
    margin-top: 1em
    input
      outline: none
      padding: 0.5em
      border: 1px solid #00000030
      border-radius: 0.2em
      color: var(--text)
      background: #fff
      width: 25em
    .icon-sousuo
      position: absolute
      right: 0.5em

  .search-list
    margin: 0.5em
  .item
    display: inline-flex
    padding: 1em
    margin: 0.25em
    align-items: center
    border-radius: 0.2em
    transition: background 0.3s
    cursor: pointer
    background: var(--block-bg)
    width: calc(100% / 4 - 0.5em)
    .hover
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: rgba(0, 0, 0, 0.2)
      z-index: 1
      display: flex
      justify-content: center
      align-items: center
      color: #fff
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5)
      border-radius: 0.2em
      backdrop-filter: blur(1px)
      opacity: 0
      transition: opacity 0.3s
    &:hover
      background: var(--hover-bg)
      .hover
        opacity: 1
  .avatar
    width: 3em
    height: 3em
    background: var(--hover-bg)
    border-radius: 2em
    img
      width: 100%
      height: 100%
      border-radius: 2em
  .info
    margin-left: 1em
    width: calc(100% - 4em)
  .nick
    color: var(--text)
    margin-bottom: 0.1em
  .content
    font-size: 0.8em
    opacity: 0.6
    color: var(--text)
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
    margin-top: 0.5em
  .search-title
    margin-bottom: 0
    color: var(--text)
    font-weight: bold
    background: var(--active-bg)
    padding: 0.5em
    text-align: center
    font-size: 0.8em
  .icon-add
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5)
    margin-right: 0.5em
</style>
