// import Vue from 'vue'
import Router from 'vue-router'
import StoriesView from './views/StoriesView.vue'
import ArticleView from './views/ArticleView.vue'
import CommentView from './views/CommentView.vue'
import UserView from './views/UserView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import ForgetView from './views/ForgetView.vue'
import IndexView from './views/IndexView.vue'
import VerifyView from './views/VerifyView.vue'
import WellcomeView from './views/WellcomeView.vue'

Vue.use(Router)

// Story view factory
function createStoriesView(type) {
  return {
    name: `${type}-stories-view`,
    render(createElement) {
      return createElement(StoriesView, { props: { type } })
    }
  }
}

export const constantRouterMap = [
  { path: '/', component: WellcomeView, hidden: true },
  { path: '/index', component: IndexView, hidden: true },
  { path: '/login', component: LoginView, hidden: true },
  { path: '/register', component: RegisterView, hidden: true },
  { path: '/forget', component: ForgetView, hidden: true },
  { path: '/verify/:token', component: VerifyView, hidden: true },
  // { path: '/authredirect', component: authRedirect, hidden: true },
  // { path: '/404', component: Err404, hidden: true },
  // { path: '/401', component: Err401, hidden: true },
  { path: '/top', component: createStoriesView('top') },
  { path: '/new', component: createStoriesView('new') },
  { path: '/show', component: createStoriesView('show') },
  { path: '/ask', component: createStoriesView('ask') },
  { path: '/job', component: createStoriesView('job') },
  { path: '/article/:url(.*)?', component: ArticleView },
  { path: '/item/:id(\\d+)', component: CommentView },
  { path: '/user/:id', component: UserView }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   name: '权限测试',
  //   icon: 'quanxian',
  //   meta: { role: ['admin'] },
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
  // },
  { path: '*', redirect: '/404', hidden: true }
];
