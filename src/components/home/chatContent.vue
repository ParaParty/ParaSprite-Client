<template>
  <ul class="chat-content">
    <li>{{nowChatType + ' ' + nowChatId}}</li>
    <li v-for="(msg, index) in chatDB[nowChatType][nowChatId]" :key="index" :class="getClass(msg)">
      <!-- 提示信息 -->
      <p v-if="msg.type != 'message'">
        {{msg.content}}
      </p>
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
            <p v-if="item.type == 'text'" v-html="item.content"></p>
            <!-- 图片 -->
            <img v-else-if="item.type == 'img'" @click="showPic" src="@/assets/avatar2.png" alt="">
            <!-- 发送时间 -->
            <span class="send-time">time</span>
          </li>
        </ul>
      </div>
    </li>
    <li class="notice">
      <p>静态测试</p>
    </li>
    <li class="notice">
      <p>2020年11月22日</p>
    </li>
    <li class="notice time-today">
      <p>2020年11月23日</p>
    </li>
    <li class="notice">
      <p>🎉 李亮亮 加入了群聊！</p>
    </li>
    <li class="notice">
      <p>😥 李亮亮 退出了群聊！</p>
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
            <p>你好，在吗？<img class="emoji" src="/emoji/1f600.svg" alt="😀"></p>
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
            <p>你好，在吗？<img class="emoji" src="/emoji/1f600.svg" alt="😀"></p>
            <span class="send-time">9:23</span>
          </li>
          <li @click="showPic">
            <img src="@/assets/avatar2.png" alt="">
            <span class="send-time">9:24</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState } from 'vuex'
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
  methods: {
    showPic () {
      ipcRenderer.send('showPic')
    },
    getClass (msg) {
      const type = []
      if (['notice', 'time'].includes(msg.type)) {
        type.push('notice')
      }
      if (msg.from === this.id) {
        type.push('right')
      }
      return type
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
    li
      padding: 0.25em
      ::v-deep .emoji
        width: 1.2em
        height: 1.2em
        vertical-align: sub
      img
        max-height: 10em
        border-radius: 0.2em
        vertical-align: top
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
</style>
