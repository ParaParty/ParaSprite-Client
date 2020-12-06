<template>
  <div class="intro">
    <div class="content">
      <img src="@/assets/img/dog.gif" alt="">
      <div>
        <div class="title">
          <h1>嗨，初来乍到，不知道做些什么？</h1>
          <h1>你可以……</h1>
        </div>
        <div class="action">
          <p>通过<span class="tip">搜索</span>寻找您的好友，或您所感兴趣的公开群组。</p>
          <p>使用<span class="tip">联系人</span>列表与您的好友或群组交流，随时随地。</p>
          <p>有一些想法和灵感？或者想知道朋友们的动态？欢迎去<span class="tip">星球</span>看看！</p>
        </div>
      </div>
    </div>
    <logo class="logo"/>
  </div>
</template>

<script>
import logo from '@/components/logo.vue'
export default {
  components: {
    logo
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/color.sass"
  .intro
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    width: 100%
    height: 100%
    background: #fff
  .logo
    position: absolute
    transform: scale(4)
    right: 5em
    bottom: 5em
    opacity: 0.05
  .content
    display: flex
    align-items: center
    color: $text
    img
      margin-right: 1em
    .title
      font-weight: bold
      font-size: 0.8em
    .action
      margin-top: 0.5em
      line-height: 2em
    .tip
      color: $main
      padding: 0 0.5em
</style>
