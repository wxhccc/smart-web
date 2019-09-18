<template>
  <ue-form-fields
    class="swcomp-fi-phone-verify"
    :items="handleField"
    v-model="handleValue"
  >
  </ue-form-fields>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.swcomp-fi-phone-verify {
  /deep/ .fi-verify-code {
    .el-input {
      width: 80%;
    }
    .fi-verify-btn {
      width: 18%;
      margin-left: 1%;
      display: inline-block;
    }
  }
}
</style>