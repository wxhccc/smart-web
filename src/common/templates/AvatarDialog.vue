<template>
  <el-dialog
    class="swcomp-avatar-dialog"
    v-bind="dialogProps"
    v-on="$listeners"
    @close="closeDialog"
  >
    <el-row class="inner-wrap" type="flex">
      <el-col class="operation-wrap" :span="18">
        <ue-cropper
          v-if="src"
          class="avatar-ope-pane"
          :src="src"
          type="avatar"
          :options="cropperProps"
          ref="cropper"
          v-loading="!canSend"
          @on-ready="cropperReady"
        >
        </ue-cropper>
      </el-col>
      <el-col class="preview-wrap" :span="5" :offset="1">
        <oss-upload class="local-file" ref="ossUpload" :http-request="getOssFile" custom-dir="avatar/" :key="ossKey">
          <template #trigger><el-button>选择图片文件</el-button></template>
        </oss-upload>
        <p class="tool-btns">
          <el-button size="mini" icon="el-icon-refresh" title="重置" @click="resetCropper"></el-button>
        </p>
        <div class="priview-pane">
          <p>头像预览</p>
          <div class="priview-img">
            <div class="priview-img-pane" ref="preview"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sendImageOss" :disabled="!canSend" :loading="sending">{{sending ? '提交中' : '确 定'}}</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { Cropper } from '@wxhccc/ui-extend'
import OssUpload from '@/common/templates/OssUpload'

export default {
  name: 'AvatarDialog',
  components: {
    [Cropper.name]: Cropper,
    OssUpload
  },
  props: {
    initSrc: String,
    title: String,
    customRequest: Function
  },
  data () {
    return {
      src: this.initSrc,
      inited: false,
      canSend: false,
      ...this.initState()
    }
  },
  computed: {
    ossHost () {
      const { ossAccessToken } = this.$store.getters
      return ossAccessToken && ossAccessToken.host
    },
    dialogProps () {
      return Object.assign({ title: this.title }, this.$attrs)
    },
    cropperProps () {
      return { preview: '.priview-img-pane' }
    },
    $cropper () {
      return this.$refs.cropper && this.$refs.cropper.$cropper
    }
  },
  watch: {
    '$attrs.visible': 'initSrcState'
  },
  methods: {
    $oss () {
      return this.$refs.ossUpload
    },
    initState () {
      return {
        sending: false,
        ossKey: Math.random(),
        ossFileKey: ''
      }
    },
    initSrcState (newVal) {
      if (newVal && this.initSrc && !this.inited) {
        this.inited = true
        this.$nextTick(() => {
          this.ossFileKey = this.$oss().getNewFileKey(this.initSrc)
        })
      }
    },
    getOssFile (request) {
      this.ossFileKey = request.data.key
      this.renderLocalImage(request.file)
      this.ossKey = Math.random()
    },
    renderLocalImage (file) {
      this.src = window.URL.createObjectURL(file)
    },
    /** evnets **/
    cropperReady () {
      this.canSend = true
    },
    getCropperBlob () {
      return new Promise(resolve => {
        this.$cropper.getCroppedCanvas().toBlob(resolve)
      })
    },
    async sendImageOss () {
      if (this.$cropper) {
        this.sending = true
        const file = await this.getCropperBlob()
        const ossConfig = Object.assign({ key: this.ossFileKey }, this.$oss().getOssToken(), { file })
        let formData = new FormData()
        for(let i in ossConfig) {
          formData.append(i, ossConfig[i])
        }
        this.$fetch(this.ossHost, formData, 'POST').useCore('third').promise().then((data) => {
          this.$emit('on-avatar-success', data.imgUrl)
          return this.customRequest && this.customRequest(data.imgUrl)
        }).then(success => (success && this.closeDialog())).finally(() => (this.sending = false))
      }
    },
    resetCropper () {
      this.$cropper && this.$cropper.reset()
    },
    closeDialog () {
      this.$emit('update:visible', false)
      Object.assign(this.$data, this.initState())
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-avatar-dialog {
  @mixin grey-bg {
    background-color: #f1f1f1;
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .inner-wrap {
    align-items: stretch;
  }
  .operation-wrap {
    display: inline-flex;
    position: relative;
    padding-top: 45%;
    @include grey-bg;
  }
  .preview-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .avatar-ope-pane {
    @include absolute;
    left: 0;
    top: 0;
  }
  .dialog-footer .el-button {
    min-width: 100px;
    margin-left: 20px;
  }
  .priview-pane {
    width: 80%;
    .priview-img {
      position: relative;
      width: 100%;
      padding-top: 100%;
      @include grey-bg;
      .priview-img-pane {
        @include absolute;
        left: 0;
        top: 0;
        overflow: hidden;
      }
    }
  }
  
}
</style>
