<template>
  <div class="page-404">
    <starry-sky></starry-sky>
    <div class="content-pane">
      <h2>404</h2>
      <h4>Page Not Find</h4>
      <router-link to="/"><el-button class="return-btn" type="primary" plain>返回首页</el-button></router-link>
    </div>
  </div>
</template>
<script>
import StarrySky from '@/common/templates/StarrySky'
export default {
  name: 'Page404',
  components: {
    StarrySky
  }
}
</script>
<style lang="scss" scoped>
.page-404 {
  @include relative;
  background-color: $dark-black;
  .content-pane {
    @include statis-mid-box(600px, 320px);
    z-index: 2000;
    text-align: center;
    color: $white;
    h2 {
      font-size: 80px;
      color: $theme-color;
      margin: 0;
    }
    h4 {
      margin: 36px 0 28px;
      font-size: 30px;
    }
    .return-btn {
      background-color: transparent;
    }
  }
}
</style>