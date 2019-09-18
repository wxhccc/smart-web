<template>
  <el-card v-bind="$attrs" class="swtpl-image-field" shadow="never">
    <slot name="background">
      <div class="backgroud"></div>
    </slot>
    <div class="image-pane">
      <img v-if="value" :src="value" alt="" />
      <oss-upload class="upload-hanlder" @on-success="onUpdate">
        <el-button slot="trigger" :icon="value ? 'el-icon-edit' : 'el-icon-upload'">{{value ? '重传' : '上传'}}</el-button>
      </oss-upload>
    </div>
  </el-card>
</template>
<script>
import OssUpload from '../OssUpload'
export default {
  name: 'ImageField',
  components: {
    OssUpload
  },
  props: {
    value: String
  },
  methods: {
    onUpdate (result) {
      this.$emit('change', result.url)
      this.$emit('input', result.url)
    }
  }
}
</script>
<style lang="scss" scoped>
.swtpl-image-field {
  position: relative;
  width: 200px;
  height: 128px;
  .backgroud {
    @include relative;
    background-color: #e3ebf9;
  }
  /deep/ .el-card__body {
    @include relative;
    padding: 0;
  }
  .image-pane {
    @include absolute;
    img {
      width: 100%;
    }
    .upload-hanlder {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -16px;
      margin-left: -36px;
      opacity: .7;
    }
  }
}
</style>
