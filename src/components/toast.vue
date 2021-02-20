<template>
  <div class="toast">
    <transition-group name="toast" tag="ul">
      <li class="toast-item" v-for="item in items" :key="item.time">{{item.text}}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  }
}
</script>

<style lang="sass" scoped>
.toast
  position: absolute
  top: 0
  width: 100%
  display: flex
  justify-content: center
  z-index: 1
  ul
    display: flex
    flex-direction: column
    align-items: center
.toast-item
  list-style: none
  padding: 0.5em
  background: #fff
  color: #333
  border: 1px solid #bdbdbd
  border-radius: 0.2em
  margin: 0.5em 0
  box-shadow: 0 2px 6px -3px rgba(0, 0, 0, 0.6)
  transition: all 0.3s ease
.toast-enter, .toast-leave-to
  opacity: 0
  transform: translateY(-30px)
.toast-leave-active
  position: absolute
  width: max-content
</style>
