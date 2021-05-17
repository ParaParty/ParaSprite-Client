<template>
  <div v-if="showPop" class="pop">
    <div class="cover"></div>
    <div v-if="showPop == 'changeName'" class="box">
      <p class="title">修改昵称</p>
      <input v-model="userName" type="text">
      <div class="btn">
        <p @click="setUserName" class="btn-y">确认</p>
        <p @click="setShowPop('')" class="btn-n">取消</p>
      </div>
    </div>
    <div v-if="showPop == 'changeSign'" class="box">
      <p class="title">修改个性签名</p>
      <input v-model="userSign" type="text">
      <div class="btn">
        <p @click="setUserSign" class="btn-y">确认</p>
        <p @click="setShowPop('')" class="btn-n">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['showPop', 'id'])
  },
  data () {
    return {
      userName: '',
      userSign: ''
    }
  },
  methods: {
    ...mapActions(['setShowPop', 'setId']),
    setUserName () {
      this.axios.post(`/api/users/${this.id}`, {
        nick: this.userName
      }).then(res => {
        this.setId(res.data)
        this.setShowPop('')
      })
    },
    setUserSign () {
      this.axios.post(`/api/users/${this.id}/sign`, {
        sign: this.userSign
      }).then(res => {
        this.setId(res.data)
        this.setShowPop('')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.pop
  display: flex
  justify-content: center
  align-items: center
  z-index: 3
.pop, .cover
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
.cover
  background: rgba(0, 0, 0, 0.2)
.box
  background: #fff
  position: absolute
  padding: 1em
  border-radius: 0.2em
  border-top: 2px solid var(--main)
.title
  font-size: 1.25em
  font-weight: bold
  color: var(--text)
  margin-bottom: 0.5rem
input
  outline: none
  padding: 0.5em
  border: 1px solid var(--active-bg)
  background: var(--block-bg)
  border-radius: 0.2em
.btn
  margin-top: 0.75rem
.btn p
  display: inline-block
  padding: 0.5em 0.7em
  border-radius: 0.2em
.btn-y
  background: #45c31c
  color: #fff
  margin-right: 0.5em
.btn-n
  background: var(--active-bg)
</style>
