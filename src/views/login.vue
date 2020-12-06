<template>
  <div class="login">
    <div class="card">
      <logo class="logo"/>
      <div class="title">
        <h1>欢迎回来！</h1>
        <p>使用您的账号登录派瑞精灵。</p>
      </div>
      <div class="input">
        <input placeholder="邮箱" type="text">
        <input placeholder="密码" type="password">
      </div>
      <div @click="login" class="btn">
        <p>登录</p>
      </div>
      <div class="tip">
        <span>忘记密码？</span>
        <span>注册新的账号</span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/logo.vue'
export default {
  components: {
    logo
  },
  methods: {
    login () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
  .login
    width: calc(100% - 4em)
    height: 100vh
    background: url('~@/assets/img/bg.png')
    background-size: cover
    display: flex
    justify-content: center
    align-items: center
  .logo
    transform: scale(3)
    position: absolute
    top: 1em
    left: 1em
    opacity: 0.05
  .card
    width: 25em
    background: #fff
    border-radius: 0.2em
    box-shadow: 0 0 15px -10px #000
    overflow: hidden
    padding: 2em
    right: 1.5em
  .title
    z-index: 1
    h1
      font-size: 1.5em
      letter-spacing: 0.1em
      color: #252525
    p
      color: var(--dark)
      margin-top: 0.5em
  .input
    border-radius: 0.2em
    background: rgba(255, 255, 255, 0.5)
    backdrop-filter: blur(2px)
    border: 1px solid #ddd
    margin: 1em 0
    input
      outline: none
      padding: 0.5em
      border: none
      width: 100%
      transition: background 0.3s
      border-radius: 0.2em
      background: none
  .btn
    p
      background: #45c31c
      padding: 0.5em
      color: #fff
      border-radius: 0.2em
      text-align: center
  .tip
    color: var(--text)
    font-size: 0.8em
    margin-top: 1em
    opacity: 0.6
    span
      margin-right: 0.5em
</style>
