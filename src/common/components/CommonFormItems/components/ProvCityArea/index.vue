<template>
  <ue-form-field-item
    class="swcomp-fi-prov-city-area"
    v-bind="handleField"
    v-model="formData"
  >
  </ue-form-field-item>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.swcomp-fi-prov-city-area {
  /deep/ .el-select {
    width: 100%;
  }
}
</style>