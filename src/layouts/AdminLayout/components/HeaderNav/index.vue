<template>
  <div class="swcomp-header-nav">
    <div class="header-title">SmartWeb</div>
    <ul class="right-menu">
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> -->
      <li class="menu-module-item">
        <user-center-module
          :userInfo="userInfo"
          :menuItems="dropMenuItems"
          @on-logout="logout"
        >
        </user-center-module>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCenterModule from './components/UserCenterModule'

export default {
  name: 'HeaderNav',
  components: {
    UserCenterModule
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    dropMenuItems () {
      return [
        { route: { name: 'AdminIndex' }, label: '首页' }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.commit('LOGIN_OUT')
    }
  }
}
</script>
<style lang="scss">
.header-dropdown-menu-pane {
  @include thick-dark-backgroud;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); 
  min-width: 200px;
  color: $white;
  z-index: 10000 !important;
  .user-nick {
    line-height: 36px;
    padding: 0 20px 5px;
    border-bottom: 1px solid $border-color;
  }
  .el-dropdown-menu__item {
    color: $white;
    &:hover {
      background: none;
    }
    &.el-dropdown-menu__item--divided {
      border-top-color: $border-color;
      &:before {
        @include thick-dark-backgroud;
      }
    }
  }
  &.el-popper[x-placement^="bottom"] .popper__arrow:after {
    border-bottom-color: $thick-dark-bg-color;
  }
}
</style>
<style lang="scss" scoped>
.swcomp-header-nav {
  height: 100%;
  .header-title {
    float: left;
    width: 280px;
    line-height: 60px;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    height: 100%;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;
    color: $white;
    li {
      float: left;
      padding: 10px;
      height: 100%;
      &:hover {
        @include thick-dark-backgroud;
      }
    }
    &:focus{
     outline: none;
    }
  }
}
</style>
