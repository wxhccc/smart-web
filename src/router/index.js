import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts/Layout'
import AdminIndex from '@/views/AdminIndex'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import store from '@/store'
export * from './routerHandler'

Vue.use(Router)

const router = new Router({
  routes: [
    /* 后台框架页面 */
    {
      path: '/',
      name: 'Admin',
      component: () => import('@/layouts/AdminLayout'),
      children: [
        {
          path: '',
          name: 'AdminIndex',
          component: AdminIndex
        }
      ]
    },
    /* 全屏页面，无登陆限制页面 */
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/Login')
        },
        {
          path: '404',
          name: 'Page404',
          component: () => import('@/views/P404')
        }
      ]
    }
  ]
})
/** 离开页面前如果目的路由需要设置记录则记录到vuex，然后在返回时利用记录路由值恢复之前页面状态 **/
const setRemember = (to, from, next) => {
  if (to.meta.remember) {
    store.commit('SET_REMEMBER_ROUTE', from.name)
  }
  const remember = (from.meta.remember || !from.name) && (!store.getters.rememberRoute || to.name === store.getters.rememberRoute)
  store.commit('SET_REMEMBER', remember)
  next()
}
/** 全局路由前置守卫，用来控制登陆鉴权和页面跳转限制 **/
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果未登录，判断跳转路由是否是需登陆路由，如果是跳回到登陆页，否则允许跳转
  if (!store.getters.isLogin) {
    !to.matched[0] || to.matched[0].name === 'Admin' ? next({ name: 'Login' }) : next()
    NProgress.done()
  } else {
    // 如果已登录，判断跳转路由是否是登陆页，如果是跳回到后台首页，否则允许跳转
    if (to.name === 'Login') {
      // 如果当前页面是在后台首页，阻止跳转并停止跳转动画，否则跳转到首页
      if (from.name === 'AdminIndex') {
        NProgress.done()
        next(false)
      } else {
        next({ name: 'AdminIndex' })
      }
    } else {
      setRemember(to, from, next)
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
