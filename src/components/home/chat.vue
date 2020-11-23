<template>
  <div class="chat">
    <div class="chat-title">
      <i class="iconfont icon-xiaoxi"></i>
      <h1>陆陆侠</h1>
    </div>
    <ul class="chat-content">
      <li class="time">
        <p>2020年11月22日</p>
      </li>
      <li>
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="">
        </div>
        <div class="content">
          <h2 class="nick">陆陆侠</h2>
          <div class="message">
            <p>嘿嘿！<span class="send-time">9:23</span></p>
            <p>你好，在吗？<span class="send-time">9:23</span></p>
            <p>
              <img src="@/assets/avatar2.png" alt="">
              <span class="send-time">9:24</span>
            </p>
          </div>
        </div>
      </li>
      <li class="right">
        <div class="avatar">
          <img src="@/assets/avatar2.png" alt="">
        </div>
        <div class="content">
          <h2 class="nick">陆陆侠</h2>
          <div class="message">
            <p>你好，在的！<span class="send-time">9:24</span></p>
          </div>
        </div>
      </li>
      <li class="time time-today">
        <p>2020年11月23日</p>
      </li>
      <li>
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="">
        </div>
        <div class="content">
          <h2 class="nick">陆陆侠</h2>
          <div class="message">
            <p>啊哈，我说贝蒂莉亚，你不是说要去我的院子里去玩吗？<span class="send-time">10:31</span></p>
          </div>
        </div>
      </li>
      <li class="right">
        <div class="avatar">
          <img src="@/assets/avatar2.png" alt="">
        </div>
        <div class="content">
          <h2 class="nick">陆陆侠</h2>
          <div class="message">
            <p>可不是嘛，麦克！不过你得先给我买杯🐱尿~<span class="send-time">10:32</span></p>
          </div>
        </div>
      </li>
      <li>
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="">
        </div>
        <div class="content">
          <h2 class="nick">陆陆侠</h2>
          <div class="message">
            <p>老张开车去东北~~~<span class="send-time">10:34</span></p>
            <p>撞了。<span class="send-time">10:34</span></p>
            <p>肇事司机耍流氓~~~<span class="send-time">10:34</span></p>
            <p>跑了。<span class="send-time">10:35</span></p>
          </div>
        </div>
      </li>
    </ul>
    <editor/>
  </div>
</template>

<script>
import editor from '@/components/home/editor.vue'
export default {
  components: {
    editor
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .chat
    width: calc(100% - 14em)
    height: 100%

  .chat-title
    position: absolute
    display: flex
    width: calc(100% - 0.2em)
    color: $text
    height: 5em
    padding: 1em
    background: linear-gradient(to bottom, $bg, transparent)
    z-index: 1
    i
      font-size: 1.5em
      opacity: 0.5
    h1
      font-size: 1em
      margin-left: 0.5em
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
      // &:hover
      //   background: $hover-bg
      //   &::-webkit-scrollbar
      //     width: 1em
    &::-webkit-scrollbar
      width: 0.2em
    &::-webkit-scrollbar-thumb
      background: rgba(0, 0, 0, 0)
      transition: background 0.3s
    &:hover
      &::-webkit-scrollbar-thumb
        background: rgba(0, 0, 0, 0.3)
  .avatar
    width: 2.5em
    height: 2.5em
    img
      width: 2.5em
      height: 2.5em
      border-radius: 2em
  .content
    margin-left: 0.5em
  .nick
    font-size: 0.8em
    font-weight: normal
    color: $dark
  .message
    padding: 0.25em
    background: $block-bg
    margin-top: 0.2em
    border-radius: 0 0.5em 0.5em 0.5em
    color: $text
    p
      padding: 0.25em
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
      border-radius: 0.5em 0 0.5em 0.5em
      background: $main
      color: $bg
    .send-time
      left: inherit !important
      right: calc(100% + 1em)
      color: rgba(0, 0, 0, 0.7)
  .time p
    margin: 0 auto
    font-size: 0.8em
    color: $text
  .time-today p
    color: $main
</style>
