// import Vue from 'vue'
import ElementUI from 'element-ui'
require('element-ui/lib/theme-default/index.css')
// require('!style-loader!css-loader!element-ui/lib/theme-default/index.css')
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import mixins from './mixins'
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

// register global eleme-ui
Vue.use(ElementUI)

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
// new Vue(Vue.util.extend({ el: '#root', router, store }, App))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')

// router.push('/')
