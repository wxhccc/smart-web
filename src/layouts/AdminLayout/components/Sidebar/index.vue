<template>
  <div class="sw-comp-sidebar">
    <div class="menu-explode-btn">
      <i class="sw-icon-menu btn-icon" :class="{'is-active': sidebar.opened}" @click="toggleSideBar"></i>
    </div>
    <el-scrollbar
      class="sw-el-scrollbar side-menu-pane"
      :native="false"
      ref="elscrollbar"
    >
      <el-menu
        class="side-main-menu"
        mode="vertical"
        :default-active="defaultMenuActive"
        :collapse="isCollapse"
        :unique-opened="true"
      >
        <menu-item
          v-for="(item, index) in menuItems"
          :item="item"
          :key="index"
        >
        </menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from './components/MenuItem'
export default {
  name: 'AppSideBar',
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    menuItems () {
      return this.sidebar.menuItems || []
    },
    defaultMenuActive () {
      const { name, meta: { activeTarget } } = this.$route
      return activeTarget || name
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
$menuTextColor: #ffffff;
.sw-comp-sidebar {
  @include relative;
  height: 100%;
  padding-top: 50px;
  color: $menuTextColor;
  .menu-explode-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid transparentize($white, 0.8);
    line-height: 50px;
    text-align: center;
    .btn-icon {
      display: inline-block;
      cursor: pointer;
      font-size: 20px;
      transform: rotate(90deg);
      transition: .38s;
      &.is-active {
        transform: rotate(0deg);
      }
    }
  }
  /deep/ .side-menu-pane {
    .el-menu {
      border-right: 0;
      background-color: $menu-bg;
    }
    .side-main-menu {
      &:not(.el-menu--collapse) {
        width: 210px;
      }
      &.el-menu--collapse {
        .el-submenu__title {
          span, .el-submenu__icon-arrow {
            display: none;
          }
        }
      }
      .menu-icon {
        margin-right: 14px;
        font-size: 18px;
      }
      .el-submenu__title, .el-menu-item {
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        color: $menuTextColor;
        &:hover, &:focus {
          color: $menu-active-color;
          background-color: $menu-hover-bg;
        }
      }
      .el-menu-item.is-active {
        color: $menuTextColor;
        background-color: $theme-color;
      }
      .side-sub-menu {
        .el-menu {
          background-color: $sub-menu-bg;
        }
        .el-menu-item {
          height: 36px;
          line-height: 36px;
          padding-left: 48px;
        }
        &.is-opened, &>.el-menu  {
        }
      }
    }
  }
  
}
</style>
