// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  sync
} from 'vuex-router-sync'
import NProgress from 'nprogress'; // Progress 进度条
import * as filters from './filters'
import mixins from './mixins'
const storage = weex.requireModule('storage')
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// permissiom judge
function hasPermission(roles = [], permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login', '/resend', '/register', '/verify', '/forget', '/']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  storage.getItem('User-Token', e => {
    if (e.result === 'success' || store.getters.token) { // 判断是否有token
      if (to.path === '/login' || to.path === '/') {
        next({
          path: '/index'
        });
      } else {
        // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        //   store.dispatch('GetInfo').then(res => { // 拉取user_info
        //     // const roles = res.data.role;
        //     const roles = res ? ['customer'] : [];
        //     store.dispatch('GenerateRoutes', {
        //       roles
        //     }).then(() => { // 生成可访问的路由表
        //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //       next({ ...to
        //       }); // hack方法 确保addRoutes已完成
        //     })
        //   })
        // } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next(); //
        } else {
          next({
            path: '/401',
            query: {
              noGoBack: true
            }
          });
        }
        // 可删 ↑
        // }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next('/login'); // 否则全部重定向到登录页
        NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }
    }
  })
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// Vue.config.productionTip = false;

// 生产环境错误日志
// if (process.env === 'production') {
//   Vue.config.errorHandler = function(err, vm) {
//     console.log(err, window.location.href);
//     errLog.pushLog({
//       err,
//       url: window.location.href,
//       vm
//     })
//   };
// }


// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue(Vue.util.extend({
  el: '#root',
  router,
  store
}, App))

router.push('/')