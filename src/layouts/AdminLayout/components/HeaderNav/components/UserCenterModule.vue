<template>
  <el-dropdown class="swcomp-user-center-module" trigger="click">
    <div class="avatar-pane">
      <img class="user-avatar" :src="userInfo.avatar">
      <i class="el-icon-caret-bottom"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="header-dropdown-menu-pane">
        <div class="user-nick" v-if="userInfo.nick">
          <span class="user-name">{{userInfo.nick}}</span>
        </div>
        <router-link v-for="(item, index) in menuItems" :to="item.route" :key="index">
          <el-dropdown-item>{{item.label}}</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <div @click="$emit('on-logout')">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>

export default {
  name: 'UserCenterModule',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    },
    menuItems: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-user-center-module {
  position: relative;
  color: $white;
  height: 100%;
  .avatar-pane {
    height: 100%;
    cursor: pointer;
    padding-right: 20px;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    background-color: transparentize($white, 0.4)
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -6px;
    font-size: 12px;
  }
}
</style>
