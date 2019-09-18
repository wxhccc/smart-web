<template>
  <section class="swcomp-app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>
<style lang="scss">
.swcomp-app-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px 18px;
  & > div {
    min-width: 600px;
  }
}
</style>
