<template>
  <router-link v-if="!item.children || !item.children.length" :to="{name: item.name}">
    <el-menu-item :index="item.name" class="side-menu-item">
      <i class="menu-icon" :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </router-link>
  <el-submenu v-else :index="item.name" class="side-sub-menu">
    <template slot="title">
      <i class="menu-icon" :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </template>
    <menu-item v-for="child in item.children" :item="child" :key="child.title">
    </menu-item>
  </el-submenu>
</template>

<script>

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
