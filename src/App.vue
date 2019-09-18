<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/public/styles/index.scss'
import { logout } from '@/api/auth'
import { handleMenuInfo, addDynamicRouters } from '@/router'
import { Storage } from '@/utils'

export default {
  name: 'app',
  components: {
  },
  created () {
    // this.appVersionCheck()
    this.$store.getters.isLogin && this.getSidebarInfo()
  },
  data () {
    return {
      sidebarJson: ''
    }
  },
  watch: {
    '$store.getters.isLogin' (newVal) {
      newVal ? this.getSidebarInfo() : this.loginOut()
    },
    '$store.getters.verRecheck' (newVal) {
      newVal && this.appVersionCheck()
    }
  },
  methods: {
    // 登出系统
    loginOut () {
      this.$fetch(logout).finally(() => location.reload())
    },
    // 获取左侧菜单数据并缓存
    getSidebarInfo () {
      /* to do
        推荐逻辑，获取接口数据，经过handleMenuInfo处理后得到menu和dynaRoutes
        调用addDynamicRouters(this.$router, dynaRoutes)添加动态路由
        发送this.$emit('SET_SIDEBAR_MENU', menu)将菜单提交到adminLayout
        也可自行修改相应逻辑
      */
      addDynamicRouters(this.$router)
    },
    // 系统版本检查
    appVersionCheck () {
    }
  }
}
</script>
<style>

</style>
