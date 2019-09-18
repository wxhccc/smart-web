<template>
  <div class="app-wrapper app-layout">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {},
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.app-layout {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
