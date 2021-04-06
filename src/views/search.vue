<template>
  <div class="search">
    <div class="header">
      <ul>
        <li @click="choose(0)" :class="type == 0 ? 'active' : ''">搜索好友</li>
        <li @click="choose(1)" :class="type == 1 ? 'active' : ''">搜索公开群组</li>
        <li @click="choose(2)" :class="type == 2 ? 'active' : ''">创建群组</li>
      </ul>
      <div v-if="type != 2" class="input">
        <input @keydown.enter="search" v-model="input" placeholder="昵称/邮箱" type="text">
        <i @click="search" class="iconfont icon-sousuo"></i>
      </div>
      <p v-else-if="createStep == 'create'" class="create-tip">为自己的群组设定一些基础信息。之后，您可以随时修改。</p>
      <p v-else-if="createStep == 'invite'" class="create-tip">还差最后一步，邀请你的好友加群吧~</p>
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
    <div v-if="type == 2" class="create-group">
      <div v-if="createStep == 'create'" class="group-setup">
        <div @click="avatarSelect" :class="[groupForm.avatar ? 'avatar-active' : '', 'group-setup-avatar']">
          <input @change="avatarUpload" type="file" accept="image/png,image/jpeg" ref="avatar" class="avatar-upload">
          <i class="iconfont icon-shangchuan"></i>
          <img v-if="groupForm.avatar" :src="`http://127.0.0.1:7001/public/${groupForm.avatar}`" alt="">
        </div>
        <div class="input">
          <p>群名称</p>
          <input v-model="groupForm.nick" type="text" name="" id="">
        </div>
        <div class="input">
          <p>群简介</p>
          <textarea v-model="groupForm.intro" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <p @click="createGroup()" :class="[groupForm.nick && groupForm.intro ? '' : 'btn-hide' ,'btn']">完成创建</p>
      </div>
      <div v-else-if="createStep == 'invite'">
        <ul class="search-list">
          <li @click="add(item.mail)" v-for="item in searchList" :key="item._id" class="item">
            <div class="hover">
              <i class="iconfont icon-add"></i>
              <p>邀请入群</p>
            </div>
            <div class="avatar">
              <img :src="`https://api.multiavatar.com/${item._id}.png`" alt="">
            </div>
            <div class="info">
              <p class="nick">{{item.nick}}</p>
              <p class="content">{{item.sign}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      type: 0,
      input: '',
      searchList: [],
      createStep: 'create',
      groupForm: {
        avatar: '',
        nick: '',
        intro: ''
      }
    }
  },
  computed: {
    ...mapState(['relationship'])
  },
  methods: {
    ...mapActions(['getCardMsg']),
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
    add (mail) {
      // this.axios.get('/api/test')
      this.axios.post('/api/users/add', {
        mail: mail
      }).then(res => {
        this.$toast.showToast(`已向${this.input}发送好友请求！`)
        this.getCardMsg({
          id: res.data.userId,
          time: res.data.time,
          content: res.data.content,
          include: res.data.include
        })
      }).catch(err => {
        this.$toast.showToast(err.response.data.message)
      })
    },
    avatarSelect () {
      this.$refs.avatar.click()
    },
    avatarUpload () {
      const avatar = this.$refs.avatar.files[0]
      const data = new FormData()
      data.append('file', avatar)
      this.axios.post('/api/upload/img', data).then(res => {
        this.groupForm.avatar = res.data.url
        // this.groupForm.avatar = res.data.url
      })
    },
    createGroup () {
      // this.axios.post('/api/groups/create', this.groupForm)
      this.createStep = 'invite'
      this.searchList = this._.filter(this.relationship, { type: 'user' })
    }
  },
  mounted () {
    if (this.$route.hash !== '#') {
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
    input, textarea
      outline: none
      padding: 0.5em
      border: 1px solid #00000030
      border-radius: 0.2em
      color: var(--text)
      background: #fff
      width: 25em
      font-family: Microsoft Yahei
    .icon-sousuo
      position: absolute
      right: 0.5em
    textarea
      height: 10em

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
  .create-tip
    margin-top: 1em
    color: var(--dark)
    font-weight: bold
  .group-setup
    display: flex
    flex-direction: column
    align-items: center
    .input
      flex-direction: column
      align-items: baseline
      margin: 0
      p
        font-size: 0.89em
        font-weight: bold
        color: var(--dark)
        letter-spacing: 0.1em
        margin: 0.5em 0
  .avatar-upload
    display: none
  .avatar-active
    border: none !important
  .group-setup-avatar
    cursor: pointer
    width: 5em
    height: 5em
    border: 2px dashed var(--dark)
    border-radius: 3em
    display: flex
    justify-content: center
    align-items: center
    color: var(--dark)
    margin-top: 1em
    .icon-shangchuan
      font-size: 2.5em
    img
      position: absolute
      width: 100%
      height: 100%
      border-radius: 3em
  .btn
    background: #45c31c
    padding: 0.5em 1em
    color: #fff
    border-radius: 0.2em
    text-align: center
    transition: background .3s
    margin-top: 1.5em
    &:hover
      background: #41b61b
  .btn-hide
    opacity: 0.5
    pointer-events: none
</style>
