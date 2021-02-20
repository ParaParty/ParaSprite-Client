import toastComponent from '@/components/toast.vue'
const Toast = {}
Toast.install = (Vue) => {
  const vue = Vue
  const ToastClass = vue.extend(toastComponent)
  const instanse = new ToastClass()
  instanse.$mount(document.createElement('div'))
  document.body.appendChild(instanse.$el)
  const ToastMain = {
    showToast (text) {
      const item = {
        text: text,
        time: new Date().getTime()
      }
      setTimeout(() => {
        for (const i in instanse.items) {
          if (instanse.items[i].time === item.time) {
            instanse.items.splice(i, 1)
          }
        }
      }, 2000)
      instanse.items.push(item)
    }
  }
  vue.prototype.$toast = ToastMain
}
export default Toast
