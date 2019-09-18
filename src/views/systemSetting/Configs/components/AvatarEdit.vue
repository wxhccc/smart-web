<template>
  <div
    class="swcomp-avatar-edit"
  >
    <img v-if="url" :src="url" alt="" />
    <oss-upload class="upload-hanlder" @on-success="onUpdate">
      <el-button slot="trigger" :icon="url ? 'el-icon-edit' : 'el-icon-upload'">{{url ? '重传' : '上传'}}</el-button>
    </oss-upload>
  </div>
</template>

<script>
import OssUpload from '@/common/templates/OssUpload'

export default {
  name: 'AvatarEdit',
  components: {
    OssUpload
  },
  props: {
    url: String,
    onUpdate: {
      type: Function,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-avatar-edit {
  position: relative;
  display: inline-block;
  width: 128px;
  height: 128px;
  border: 1px solid $light-grey;
  background-color: $grey-white;
  overflow: hidden;
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
</style>
