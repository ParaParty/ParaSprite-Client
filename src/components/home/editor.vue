<template>
  <div class="editor">
    <div class="content">
      <textarea v-model="input" name="" id=""></textarea>
    </div>
    <a @click="send" class="send">
      <i class="iconfont icon-send"></i>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    send () {
      this.$socket.emit('message', this.input)
    }
  }
}
</script>

<style lang="sass" scoped>

  .editor
    display: flex
    align-items: flex-end
    position: absolute
    bottom: 0
    left: 0
    right: 0
    height: 5em
    padding: 1em
    background: linear-gradient(to top, var(--bg), transparent)
    width: calc(100% - 0.2em)
  .content
    display: flex
    width: 100%
    height: 2em
    textarea
      width: 100%
      height: 2.5em
      outline: none
      padding: 0.5em
      border: 1px solid #fff
      border-radius: 0.2em
      background: var(--block-bg)
      margin: 0px
      resize: none
      font-family: 'Microsoft Yahei'
  .send
    display: flex
    justify-content: center
    align-items: center
    background: #45c31c
    width: 4em
    height: 2em
    border-radius: 0.2em
    margin-left: 0.5em
    color: #fff
</style>
