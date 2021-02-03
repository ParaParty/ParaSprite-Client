<template>
  <div class="login">
    <transition name="card">
    <!-- 登录界面 -->
    <div v-if="type == 'login'" key="login" class="card">
      <logo class="logo"/>
      <div class="title">
        <h1>欢迎回来！</h1>
        <p>使用您的账号登录派瑞精灵。</p>
      </div>
      <div class="input">
        <p>邮箱</p>
        <input type="text">
        <p>密码</p>
        <input type="password">
      </div>
      <div @click="login" class="btn">
        <p>登录</p>
      </div>
      <div class="tip">
        <span>忘记密码？</span>
        <span @click="type = 'register'">注册新的账号</span>
      </div>
    </div>
    <!-- 注册界面 -->
    <div v-else-if="type == 'register'" key="register" class="card">
      <logo class="logo"/>
      <div class="title">
        <h1>第一次来到派瑞派对？</h1>
        <p>注册一个账号登录派瑞派对。</p>
      </div>
      <div class="input">
        <p :class="[registerForm.mail.error ? 'error' : '']">邮箱{{registerForm.mail.error}}</p>
        <input :class="[registerForm.mail.error ? 'error-input' : '']" v-model="registerForm.mail.content" type="text">
        <p :class="[registerForm.password.error ? 'error' : '']">密码{{registerForm.password.error}}</p>
        <input :class="[registerForm.password.error ? 'error-input' : '']" v-model="registerForm.password.content" type="password">
        <p :class="[registerForm.confirmPassword.error ? 'error' : '']">再次确认密码{{registerForm.confirmPassword.error}}</p>
        <input :class="[registerForm.confirmPassword.error ? 'error-input' : '']" v-model="registerForm.confirmPassword.content" type="password">
      </div>
      <div @click="register" class="btn">
        <p>注册</p>
      </div>
      <div class="tip">
        <span @click="type = 'login'">已有账号？</span>
      </div>
    </div>
    <!-- 完善信息 -->
    <div v-else-if="type == 'complete'" key="complete" class="card">
      <logo class="logo"/>
      <div class="title">
        <h1>完善个人信息</h1>
        <p>这是最后一步了！</p>
      </div>
      <div class="user-card">
        <input @change="avatarUpload" type="file" accept="image/png,image/jpeg" ref="avatar" class="avatar-upload">
        <div @click="avatarSelect" :class="[registerForm.avatar ? 'avatar-active' : '', 'avatar']">
          <img v-if="registerForm.avatar" :src="'http://127.0.0.1:7001/public/avatar/' + registerForm.avatar" alt="">
          <i class="iconfont icon-shangchuan"></i>
        </div>
        <input v-model="registerForm.nick" placeholder="昵称……" class="nick" type="text">
      </div>
      <div @click="changeNick" class="btn">
        <p>完成</p>
      </div>
      <div class="tip">
        <span @click="type = 'login'">跳过</span>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import logo from '@/components/logo.vue'
export default {
  components: {
    logo
  },
  computed: {
    ...mapState(['id'])
  },
  data () {
    return {
      type: 'complete',
      registerForm: {
        mail: {
          content: '',
          error: ''
        },
        password: {
          content: '',
          error: ''
        },
        confirmPassword: {
          content: '',
          error: ''
        },
        avatar: '',
        nick: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setId']),
    login () {
      this.$router.push('/home')
    },
    register () {
      let verify = 1
      this.registerForm.mail.error = ''
      this.registerForm.password.error = ''
      this.registerForm.confirmPassword.error = ''
      if (!RegExp(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(this.registerForm.mail.content)) {
        this.registerForm.mail.error = ' - 这个邮箱地址的格式是错误的'
        verify = 0
      }
      if (this.registerForm.password.content.length <= 6) {
        this.registerForm.password.error = ' - 这个密码太弱了'
        verify = 0
      }
      if (this.registerForm.password.content !== this.registerForm.confirmPassword.content) {
        this.registerForm.confirmPassword.error = ' - 这个密码与上次输入的密码不一致'
        verify = 0
      }
      if (this.registerForm.mail.content === '') {
        this.registerForm.mail.error = ' - 这是必填项'
        verify = 0
      }
      if (this.registerForm.password.content === '') {
        this.registerForm.password.error = ' - 这是必填项'
        verify = 0
      }
      if (this.registerForm.confirmPassword.content === '') {
        this.registerForm.confirmPassword.error = ' - 这是必填项'
        verify = 0
      }
      if (verify) {
        this.axios.post('/api/users/new', {
          mail: this.registerForm.mail.content,
          password: this.registerForm.password.content
        }).then(res => {
          this.type = 'complete'
          this.setId(res.data.id)
        }).catch(err => {
          console.log(err)
          this.registerForm.mail.error = ' - 这个邮箱已经被注册过了'
        })
      }
    },
    avatarSelect () {
      this.$refs.avatar.click()
    },
    avatarUpload () {
      const avatar = this.$refs.avatar.files[0]
      const data = new FormData()
      data.append('file', avatar)
      this.axios.post(`/api/users/${this.id}/avatar`, data).then(res => {
        this.registerForm.avatar = res.data.url
      })
    },
    changeNick () {
      this.axios.post(`/api/users/${this.id}`, {
        nick: this.registerForm.nick
      }).then(res => {
        this.$router.push('/home')
      })
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
    position: absolute
    width: 25em
    background: #fff
    border-radius: 0.2em
    box-shadow: 0 0 15px -10px #000
    overflow: hidden
    padding: 2em
    margin-left: -2em
  .title
    text-align: center
    z-index: 1
    h1
      font-size: 1.5em
      letter-spacing: 0.1em
      color: #252525
    p
      color: var(--dark)
      margin-top: 0.25em
  .input
    margin-top: 0.5em
    margin-bottom: 1em
    p
      color: var(--text)
      font-size: 0.8rem
      opacity: 0.8
    input
      border-radius: 0.2em
      background: rgba(255, 255, 255, 0.5)
      backdrop-filter: blur(2px)
      border: 1px solid #bbb
      outline: none
      padding: 0.5em
      margin: 0.5em 0
      width: 100%
      border-radius: 0.2em
  .btn
    p
      background: #45c31c
      padding: 0.5em
      color: #fff
      border-radius: 0.2em
      text-align: center
      transition: background .3s
      &:hover
        background: #41b61b
  .tip
    color: var(--text)
    font-size: 0.8em
    margin-top: 1em
    opacity: 0.6
    span
      cursor: pointer
      margin-right: 0.5em
  // 完善信息
  .user-card
    display: flex
    align-items: center
    height: 5em
    background: rgba(255, 255, 255, 0.8)
    padding: 0.5em
    margin: 1em 0
    border-radius: 0.2em
    border: 1px solid #b3b3b3
  .avatar
    display: flex
    justify-content: center
    align-items: center
    width: 4em
    height: 4em
    border: 2px dashed #b3b3b3
    border-radius: 50%
    margin-right: 1em
    cursor: pointer
    img
      width: 100%
      height: 100%
      position: absolute
  .avatar-active
    overflow: hidden
    border-style: solid
    border-color: #fff
    .icon-shangchuan
      opacity: 0
  .icon-shangchuan
    font-size: 2em
    color: #b3b3b3
  .nick
    outline: none
    border: none
    font-size: 1.5em
    width: 8em
    color: var(--text)
  .avatar-upload
    display: none
  // 卡片过渡
  .card-enter-active, .card-leave-active
    transition: all .3s
  .card-enter, .card-leave-to
    transform: translate(0, 2em)
    opacity: 0
  .error
    color: #f04747 !important
  .error-input
    border: 1px solid #ff8d8d !important
</style>
