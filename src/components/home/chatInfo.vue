<template>
  <div v-if="nowChatType == 'group'" class="info">
    <div class="group-list">
      <p class="title">管理员</p>
      <ul class="contact">
        <li>
          <img src="@/assets/avatar.png" alt="">
          <p>{{creatorData.nick}}</p>
        </li>
        <li v-for="item in managerData" :key="item._id">
          <img src="@/assets/avatar.png" alt="">
          <p>{{item.nick}}</p>
        </li>
      </ul>
      <p class="title">成员</p>
      <ul class="contact">
        <li v-for="item in userData" :key="item._id">
          <img src="@/assets/avatar.png" alt="">
          <p>{{item.nick}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      creatorData: {},
      managerData: [],
      userData: []
    }
  },
  computed: {
    ...mapState(['nowChatType', 'nowChatId'])
  },
  watch: {
    nowChatId () {
      if (this.nowChatType === 'group') {
        this.creatorData = {}
        console.log('changed group')
        this.getGroupList()
      }
    }
  },
  methods: {
    getGroupList () {
      const managers = []
      const users = []
      this.axios.get(`/api/groups/${this.nowChatId}/users`).then(res => {
        res.data.forEach(item => {
          if (item.groupType === 'creator') {
            this.creatorData = item.include[0]
          } else if (item.groupType === 'managerData') {
            managers.push(item.include[0])
          } else {
            users.push(item.include[0])
          }
        })
        this.managerData = managers
        this.userData = users
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.info
  position: absolute
  width: 15em
  top: 0
  right: 0
  bottom: 0
  display: flex
  flex-direction: column
  padding: 1em
  padding-top: 2em
  color: var(--text)
  background: var(--block-bg)
  font-size: 0.8em
.group-list
  margin-top: 1em
  .title
    font-weight: bold
    opacity: 0.8
    margin: 0.5em
    margin-top: 1em
.contact
  li
    display: flex
    align-items: center
    padding: 0.2em 0.5em
    border-radius: 0.2em
    img
      width: 1.75em
      height: 1.75em
      border-radius: 1em
      margin-right: 0.5em
    &:hover
      background: var(--hover-bg)
</style>
