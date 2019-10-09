<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/public/styles/index.scss'
import { logout, getMenuInfo } from '@/api/auth'
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
      let sidebarInfo = Storage('SIDEBARINFO') || {}
      let firstRoute = null
      if (sidebarInfo.handledData) {
        firstRoute = this.handleSidebarData(sidebarInfo.handledData)
      }
      this.$fetch(getMenuInfo).done(data => {
        const sidebarJson = JSON.stringify(data)
        if (sidebarJson !== sidebarInfo.sidebarJson) {
          sidebarInfo.sidebarJson = sidebarJson
          sidebarInfo.handledData = handleMenuInfo(data)
          firstRoute = this.handleSidebarData(sidebarInfo.handledData, true)
          // Storage('SIDEBARINFO', sidebarInfo)
        }
        firstRoute && this.$store.commit('SET_FIRST_ROUTE', firstRoute)
      })
    },
    // 处理菜单数据和添加动态权限路由
    handleSidebarData (data) {
      const { menu, dynaRoutes } = data
      addDynamicRouters(this.$router, dynaRoutes)
      this.$store.commit('SET_SIDEBAR_MENU', menu)
      return dynaRoutes[0] && !dynaRoutes[0].static && dynaRoutes[0].name
    },
    // 系统版本检查
    appVersionCheck () {
    }
  }
}
</script>
<style>

</style>
