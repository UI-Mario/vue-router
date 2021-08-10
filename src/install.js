import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  // 防止重复安装
  if (install.installed && _Vue === Vue) return
  // 但个人感觉这种属性挂载方式还不如_Vue，起码像class那样列出来
  install.installed = true

  _Vue = Vue

  // isDefined
  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        // 这段代码逻辑算是看的我有点懵
        // this指向
        // router和route
        // 代码逻辑先后，什么是传进来的，什么是内部做的
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 别的不说，先看代码，this._routerRoot最后被赋值的什么
        // :rainbow:
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
