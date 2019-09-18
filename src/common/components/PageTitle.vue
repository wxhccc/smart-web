<template>
  <div class="swcomp-page-title">
    <router-link v-if="backRoute" :to="handledBackRoute"><i class="el-icon-back"></i></router-link>
    <h3>{{title}}</h3>
  </div>
</template>
<script>
export default {
  name: 'PageTitle',
  props: {
    backRoute: [String, Object],
    title: String
  },
  computed: {
    handledBackRoute () {
      return typeof this.backRoute === 'string' ? { name: this.backRoute } : this.backRoute
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-page-title {
  padding-bottom: 16px;
  h3, i {
    display: inline-block;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
  i {
    margin-right: 10px;
  }
}
</style>
