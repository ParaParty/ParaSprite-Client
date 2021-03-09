<template>
  <ul class="chat-content">
    <li>{{nowChatType + ' ' + nowChatId}}</li>
    <li v-for="(msg, index) in chatDB[nowChatType][nowChatId]" :key="index" :class="getClass(msg)">
      <!-- 头像 -->
      <div v-if="msg.type == 'message'" class="avatar">
        <img src="@/assets/avatar.png" alt="">
      </div>
      <!-- 内容 -->
      <div v-if="msg.type == 'message'" class="content">
        <!-- 昵称 -->
        <h2 v-if="nowChatType == 'group'" class="nick">{{include.user[msg.from].nick}}</h2>
        <!-- 聊天内容 -->
        <ul class="message">
          <li v-for="(item, index) in msg.content" :key="index">
            <!-- 文本 -->
            <p @click="test($event)" v-if="item.type == 'text'" v-html="item.content"></p>
            <!-- 图片 -->
            <img v-else-if="item.type == 'img'" @click="showPic" src="@/assets/avatar2.png" alt="">
            <!-- 发送时间 -->
            <span class="send-time">time</span>
          </li>
        </ul>
      </div>
      <!-- 卡片信息 -->
      <div v-else-if="msg.type == 'card'" class="card-box">
        <p class="title">好友验证</p>
        <div class="card-content">
          <p v-if="msg.content.type == 'friendRes'">用户<span class="card-mark">{{include.user[msg.content.id].nick}}</span>申请添加您为好友。</p>
          <p v-if="msg.content.type == 'friendReq'">已向用户<span class="card-mark">{{include.user[msg.content.id].nick}}</span>发送好友申请。</p>
        </div>
        <div v-if="!msg.status" class="btns">
          <a @click="friendRes(msg.time, 1)" class="btn-confirm">确认</a>
          <a @click="friendRes(msg.time, 0)">拒绝</a>
        </div>
        <div v-else class="status">
          <p>{{msg.status}}</p>
        </div>
      </div>
      <!-- 提示信息 -->
      <div v-else>
        {{msg.content}}
      </div>
    </li>
    <!-- <li class="notice">
      <p>静态测试区域</p>
    </li>
    <li class="card">
      <p class="title">好友验证</p>
      <div class="card-content">
        <p>用户<span class="card-mark">@某人</span>申请添加您为好友。</p>
      </div>
      <div class="btns">
        <a class="btn-confirm" href="">确认</a>
        <a href="">拒绝</a>
      </div>
    </li>
    <li class="notice">
      <p>2020年11月22日</p>
    </li>
    <li class="notice time-today">
      <p>2020年11月23日</p>
    </li>
    <li class="notice">
      <p>🎉 某人 加入了群聊！</p>
    </li>
    <li class="notice">
      <p>😥 某人 退出了群聊！</p>
    </li>
    <li>
      <div class="avatar">
        <img src="@/assets/avatar.png" alt="">
      </div>
      <div class="content">
        <h2 class="nick">陆陆侠</h2>
        <ul class="message">
          <li>
            <p>嘿嘿！</p>
            <span class="send-time">9:23</span>
          </li>
          <li>
            <p>你好，在吗？<img class="emoji" src="/emoji/1f600.png" alt="😀"></p>
            <span class="send-time">9:23</span>
          </li>
          <li @click="showPic">
            <img src="@/assets/avatar2.png" alt="">
            <span class="send-time">9:24</span>
          </li>
        </ul>
      </div>
    </li>
    <li class="right">
      <div class="avatar">
        <img src="@/assets/avatar2.png" alt="">
      </div>
      <div class="content">
        <h2 class="nick">陆陆侠</h2>
        <ul class="message">
          <li>
            <p>嘿嘿！</p>
            <span class="send-time">9:23</span>
          </li>
          <li>
            <p>你好，在吗？<img class="emoji" src="/emoji/1f600.png" alt="😀"></p>
            <span class="send-time">9:23</span>
          </li>
          <li @click="showPic">
            <img src="@/assets/avatar2.png" alt="">
            <span class="send-time">9:24</span>
          </li>
        </ul>
      </div>
    </li> -->
  </ul>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState, mapActions } from 'vuex'
import data from 'emoji-mart-vue-fast/data/all.json'
import { EmojiIndex } from 'emoji-mart-vue-fast'
export default {
  data () {
    return {
      emojiIndex: new EmojiIndex(data)
    }
  },
  computed: {
    ...mapState(['id', 'nowChatId', 'nowChatType', 'chatDB', 'include'])
  },
  watch: {
    nowChatId () {
      if (!this.chatDB[this.nowChatType][this.nowChatId]) {
        this.setChatDB({
          type: this.nowChatType,
          id: this.nowChatId
        })
      }
    }
  },
  methods: {
    ...mapActions(['setChatDB']),
    ...mapActions(['setPicList']),
    showPic () {
      ipcRenderer.send('showPic')
    },
    getClass (msg) {
      const type = []
      if (['notice', 'time'].includes(msg.type)) {
        type.push('notice')
      }
      if (msg.type === 'card') {
        type.push('card')
      }
      if (msg.from === this.id) {
        type.push('right')
      }
      return type
    },
    friendRes (time, type) {
      const target = this._.find(this.chatDB[this.nowChatType][this.nowChatId], {
        time: time
      })
      if (type) {
        target.status = '已确认'
      } else {
        target.status = '已拒绝'
      }
      this.axios.post('/api/users/add/return', {
        id: target.content.id,
        time: time,
        accept: type
      })
    },
    test (e) {
      if (e.target.nodeName === 'IMG') {
        const picList = []
        let picIndex = 0
        document.querySelectorAll('.message img').forEach((pic, index) => {
          if (pic.y === e.target.y) {
            picIndex = index
          }
          picList.push(pic.src)
        })
        this.setPicList(picList)
        ipcRenderer.send('showPic', picIndex)
      }
    }
  },
  mounted () {
    if (!this.chatDB[this.nowChatType][this.nowChatId]) {
      this.setChatDB({
        type: this.nowChatType,
        id: this.nowChatId
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  // 聊天区域
  .chat-content
    display: flex
    flex-direction: column
    height: 100%
    padding: 4em 1em
    overflow-y: auto
    li
      display: flex
      border-radius: 0.2em
      padding: 0.5em
      transition: background 0.3s
      img:hover
        cursor: pointer
    &::-webkit-scrollbar
      width: 20px
    &::-webkit-scrollbar-thumb
      background: rgba(0, 0, 0, 0)
      border: 6px solid transparent
      background-clip: padding-box
      border-radius: 10px
    &:hover
      &::-webkit-scrollbar-thumb
        background: rgba(0, 0, 0, 0.2)
        border: 6px solid transparent
        background-clip: padding-box
        border-radius: 10px
        &:hover
          background: rgba(0, 0, 0, 0.3)
          border: 6px solid transparent
          background-clip: padding-box
          border-radius: 10px
  // 用户信息部分
  .avatar
    width: 2.5em
    height: 2.5em
    cursor: pointer
    img
      width: 2.5em
      height: 2.5em
      border-radius: 2em
      transition: box-shadow 0.3s
    &:hover
      img
        box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.6)
  .content
    margin-left: 0.5em
  .nick
    font-size: 0.8em
    font-weight: normal
    color: var(--dark)
  // 消息部分
  .message
    padding: 0.25em
    background: var(--block-bg)
    margin-top: 0.2em
    border-radius: 0.2em
    color: var(--text)
    max-width: 25em
    li
      padding: 0.25em
      ::v-deep .emoji
        width: 1.2em
        height: 1.2em
        vertical-align: sub
      ::v-deep img
        max-height: 10em
        border-radius: 0.2em
        display: block
      .send-time
        position: absolute
        left: calc(100% + 1em)
        bottom: 0.1em
        font-size: 0.7em
        opacity: 0
      &:hover
        background: rgba(0, 0, 0, 0.05)
        border-radius: 0.2em
        .send-time
          opacity: 0.8
  // 当消息位于右侧
  .right
    justify-content: flex-end
    .avatar
      position: absolute
      right: 0.5em
    .content
      position: relative
      right: 3em
    .nick
      text-align: right
    .message
      background: var(--main)
      color: var(--text-right)
    .send-time
      left: inherit !important
      right: calc(100% + 1em)
      color: var(--text)
  // 消息时间
  .notice p
    margin: 0 auto
    font-size: 0.8em
    color: var(--text)
  .time-today p
    color: var(--main)
  .emoji-mart-emoji
    vertical-align: sub
    padding: 0
  // 卡片信息
  .card
    background: var(--block-bg)
    margin: 0.5em 3.5em
    padding: 1em !important
    .card-box
      display: flex
      width: 100%
    .title
      font-weight: bold
      letter-spacing: 0.1em
      color: var(--dark)
      margin-right: 1em
    .card-content
      color: var(--text)
    .card-mark
      padding: 0.2em
      margin: 0.2em
      border-radius: 0.2em
      color: var(--main)
    .btns
      position: absolute
      right: -0.5em
      a
        color: var(--dark)
        margin-right: 0.5em
        padding: 0.2em
        border-radius: 0.2em
        &:hover
          background: var(--hover-bg)
      .btn-confirm
        color: var(--main)
    .status
      position: absolute
      right: 0
      color: var(--dark)
</style>
