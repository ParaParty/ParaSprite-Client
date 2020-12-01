<template>
  <div class="contact-list">
    <ul class="type">
      <li @click="showType(0)" :class="[nowShow == 0 ? 'type-active' : '']"><i class="iconfont icon-xiaoxi"></i></li>
      <li @click="showType(1)" :class="[nowShow == 1 ? 'type-active' : '']"><i class="iconfont icon-lianxiren"></i></li>
      <li @click="showType(2)" :class="[nowShow == 2 ? 'type-active' : '']"><i class="iconfont icon-qunliao"></i></li>
    </ul>
    <!-- 消息列表 -->
    <div :style="{transform: 'translate(' + (0 - 0.5 * nowShow) + 'em, 0)'}" :class="[nowShow == 0 ? '' : 'type-hide', 'item-list']">
      <ul v-for="(lists, n) in messageList" :key="lists.id" :class="['list', lists.show ? '' : 'list-hide']">
        <li @click="show(n)" class="title"><i class="iconfont icon-zhankai"></i>{{lists.name}}</li>
        <li @contextmenu.prevent='onUserMenu' @click="choose(0, n, m)" v-for="(item, m) in lists.list" :key="item.id" :class="['item', nowChoose[0] == 0 && nowChoose[1] == n && nowChoose[2] == m ? 'active-item' : '', item.haveNewMessage ? 'status-new': '', item.online ? '' : 'status-offline']">
          <div class="avatar">
            <img src="@/assets/avatar.png" alt="">
          </div>
          <div class="info">
            <p class="nick">{{item.nick}}</p>
            <p class="content">{{item.newMessage}}</p>
          </div>
          <div v-if="item.newMessageNum" class="num">
            <p>+{{item.newMessageNum}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 联系人列表 -->
    <div :style="{transform: 'translate(' + (0.5 - 0.5 * nowShow) + 'em, 0)'}" :class="[nowShow == 1 ? '' : 'type-hide', 'item-list']">
      <ul v-for="(lists, n) in contactList" :key="lists.id" :class="['list', lists.show ? '' : 'list-hide']">
        <li @click="show(n)" class="title"><i class="iconfont icon-zhankai"></i>{{lists.name}}</li>
        <li @click="choose(1, n, m)" v-for="(item, m) in lists.list" :key="item.id" :class="['item', nowChoose[0] == 1 && nowChoose[1] == n && nowChoose[2] == m ? 'active-item' : '', item.online ? '' : 'status-offline']">
          <div class="avatar">
            <img src="@/assets/avatar.png" alt="">
          </div>
          <div class="info">
            <p class="nick">{{item.nick}}</p>
            <div>
              <p class="content">{{item.icon}}{{item.sign}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 群列表 -->
    <div :style="{transform: 'translate(' + (1 - 0.5 * nowShow) + 'em, 0)'}" :class="[nowShow == 2 ? '' : 'type-hide', 'item-list']">
      <ul class="list">
        <li class="title"><i class="iconfont icon-zhankai"></i>我的群聊</li>
        <li class="item">
          <div class="avatar">
            <img src="@/assets/avatar.png" alt="">
          </div>
          <div class="info">
            <p class="nick">毁灭世界</p>
            <p class="content">有新消息</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前展示的类别
      nowShow: 0,
      // 当前选中的联系人（菜单/列表/项）
      nowChoose: [-1, 0, 0],
      // 消息列表
      messageList: [
        {
          id: 0,
          name: '置顶',
          show: 1,
          list: [
            {
              id: 0,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 1,
              haveNewMessage: 1,
              newMessageNum: 5
            },
            {
              id: 1,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 1,
              haveNewMessage: 0,
              newMessageNum: 0
            },
            {
              id: 2,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 0,
              haveNewMessage: 1,
              newMessageNum: 1
            }
          ]
        },
        {
          id: 1,
          name: '消息',
          show: 1,
          list: [
            {
              id: 3,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 1,
              haveNewMessage: 0,
              newMessageNum: 0
            },
            {
              id: 4,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 1,
              haveNewMessage: 0,
              newMessageNum: 0
            },
            {
              id: 5,
              nick: '陆陆侠',
              newMessage: '你好，在吗？',
              online: 0,
              haveNewMessage: 0,
              newMessageNum: 0
            }
          ]
        }
      ],
      // 联系人列表
      contactList: [
        {
          id: 0,
          name: '特别关注',
          show: 1,
          list: [
            {
              id: 0,
              nick: '陆陆侠',
              icon: '🐟',
              sign: '摸鱼中',
              online: 1
            }
          ]
        },
        {
          id: 1,
          name: '我的好友',
          show: 1,
          list: [
            {
              id: 3,
              nick: '陆陆侠',
              icon: '🚶',
              sign: '‍出行中',
              online: 1
            }
          ]
        }
      ]
    }
  },
  methods: {
    show (n) {
      if (this.nowShow === 0) {
        this.messageList[n].show = !this.messageList[n].show
      } else if (this.nowShow === 1) {
        this.contactList[n].show = !this.contactList[n].show
      }
    },
    showType (n) {
      this.nowShow = n
    },
    choose (type, n, m) {
      this.nowChoose = [type, n, m]
    },
    onUserMenu () {
      this.$contextmenu({
        items: [
          { label: '个人资料' },
          { label: '添加备注' },
          { label: '移出消息列表', divided: true },
          { label: '屏蔽此人消息' },
          { label: '删除好友' }
        ],
        customClass: 'contextmenu',
        event
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .contact-list
    width: 100%
    height: calc(100% - 2em)
  .type
    display: flex
    justify-content: space-between
    border-bottom: 1px solid $hover-bg
    li
      display: inline-block
      width: calc( 100% / 3 )
      height: 2.5em
      text-align: center
      line-height: 2.5em
      color: $text
      transition: color 0.3s
      cursor: pointer
      &:hover
        color: $main
  .type-active
    color: $main !important
    border-bottom: 1px solid

  .item-list
    position: absolute
    width: 100%
    height: calc(100% - 4em)
    margin-top: 1em
    padding: 0 1em
    overflow-y: auto
    transition: all 0.3s
    &::-webkit-scrollbar
      width: 0.2em
    &::-webkit-scrollbar-thumb
      background: rgba(0, 0, 0, 0)
      transition: background 0.3s
    &:hover
      &::-webkit-scrollbar-thumb
        background: rgba(0, 0, 0, 0.1)
  .type-hide
    opacity: 0
    pointer-events: none
  .list
    margin-bottom: 0.5em
  .list-hide
    .icon-zhankai
      transform: rotate(90deg)
    .item
      display: none
  .title
    position: sticky
    display: flex
    align-items: center
    list-style: none
    font-weight: bold
    color: $text
    background: $hover-bg
    top: 0
    padding: 0.5em
    opacity: 0.8
    font-size: 0.8em
    margin-bottom: 0.5em
    backdrop-filter: blur(5px)
    z-index: 1
    cursor: pointer
    i
      display: inline-block
      width: 1em
      height: 1em
      font-size: 0.8em
      margin-right: 0.5em
      transform: rotate(180deg)
  .item
    display: flex
    padding: 0.5em
    align-items: center
    border-radius: 0.2em
    transition: background 0.3s
    cursor: pointer
    &:hover
      background: $hover-bg
  .active-item
    display: flex !important
    background: $active-bg !important
  .avatar
    width: 2.5em
    height: 2.5em
    background: $hover-bg
    border-radius: 2em
    img
      width: 100%
      height: 100%
      border-radius: 2em
  .info
    margin-left: 0.5em
  .nick
    color: $text
    margin-bottom: 0.1em
  .content
    font-size: 0.8em
    opacity: 0.6
    color: $text
  .num
    position: absolute
    right: 0.5em
    color: $main
  .status-new
    .content
      color: $main
      opacity: 0.8
  .status-offline
    opacity: 0.5
</style>
