<template>
  <el-container class="app-wrapper app-admin-layout">
    <el-header class="app-nav-header" height="60px">
      <header-nav></header-nav>
    </el-header>
    <el-container class="main-container">
      <el-aside :width="sidebarStyles" class="app-side-menu">
        <sidebar></sidebar>
      </el-aside>
      <el-main class="app-main-pane">
        <app-main>
        </app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { HeaderNav, Sidebar, AppMain } from './components'
// import { websocketListen } from '@/mixins'
import { mapGetters } from 'vuex'
import getPrevConfig from '@/plugins/getPrevConfig'

export default {
  name: 'AdminLayout',
  components: {
    HeaderNav,
    Sidebar,
    AppMain
  },
  // mixins: [websocketListen],
  beforeRouteEnter: getPrevConfig,
  beforeRouteUpdate: getPrevConfig,
  created () {
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'sidebar'
    ]),
    sidebarStyles () {
      return (this.sidebar && this.sidebar.opened ? 210 : 60) + 'px'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.app-admin-layout {
  position: relative;
  width: 100%;
  height: 100%;
  .app-nav-header {
    @include dark-backgroud;
  }
  // 主体区域
  // 侧边栏
  .app-side-menu {
    transition: width 0.4s;
    overflow: hidden;
    border-top: 1px solid transparentize($white, 0.8);
    @include dark-backgroud;
  }
  .app-main-pane {
    @include relative;
    padding: 0;
    overflow: hidden;
    background-color: $grey-white;
  }
  .main-container {
    overflow: hidden;
  }
}
</style>
