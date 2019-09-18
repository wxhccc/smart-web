<template>
   <el-upload
    v-if="ossAccessToken.host || $attrs.httpRequest"
    class="swtpl-files-upload"
    ref="upload"
    v-bind="uploadProp"
    :action="ossAccessToken.host"
    :data="imgData"
    :on-success="uploadSuccess"
    :before-upload="beforeUpload"
    :on-error="uploadError"
    :disabled="upLoading"
    :data-handled-token="handledToken"
  >
    <slot name="trigger" :loading="upLoading"></slot>
  </el-upload>
</template>
<script>
import { md5 } from '@/utils'
import { byteStringify } from '@wxhccc/es-util'
import { getOssAccessToken } from '@/api/common'
import apiConfig, { errorHandler } from '@/plugins/smartfetch/config'
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'

const typeRegMap = {
  'image/*': /image+/,
  'video/*': /video+/
}
const defProp = {
  accept: 'image/*',
  multiple: true,
  limit: 100,
  showFileList: false
}
const defLimit = {
  type: ['image/bmp', 'image/jpeg', 'image/png', /^(video\/)/],
  size: 1024 * 1024 * 2
}

export default {
  name: 'OssUpload',
  props: {
    tokenHanlder: Function,
    limit: Object,
    attach: Object,
    keepFileName: Boolean,
    customDir: {
      type: String,
      default: ''
    },
    cache: Boolean
  },
  components: {
  },
  data () {
    return {
      imgData: {},
      upLoading: false
    }
  },
  created () {
    this.checkOssExpired() && this.getOssAccessToken()
  },
  computed: {
    ...mapGetters([
      'ossAccessToken'
    ]),
    handledToken () {
      const { ossAccessToken, tokenHanlder } = this
      return Object.assign({ 'success_action_status': 200 }, tokenHanlder ? tokenHanlder(ossAccessToken) : this.$_.pick(ossAccessToken, ['OSSAccessKeyId', 'callback', 'policy', 'signature', 'x-oss-security-token']))
    },
    uploadProp () {
      return Object.assign({}, defProp, this.$attrs)
    },
    limitOpts () {
      return Object.assign({}, defLimit, this.limit)
    }
  },
  methods: {
    /* utils */
    getOssToken () {
      return this.handledToken
    },
    checkFileType (type, file) {
      const { accept } = this.$attrs
      if (typeRegMap[accept] && !typeRegMap[accept].test(type)) return false
      const {type: limitType} = this.limitOpts
      return !Array.isArray(limitType) || (limitType.length === 0) || limitType.some((val) => {
        if (typeof val === 'string') {
          return val === type
        } else if (typeof val === 'function') {
          return val(type, file)
        } else if (val instanceof RegExp) {
          return val.test(type)
        }
        return false
      })
    },
    checkFileSize (size) {
      const { size: limitSize } = this.limitOpts
      return (limitSize <= 0 || size < limitSize)
    },
    getNewFileName (fileName) {
      const fileInfo = fileName.split('.')
      const orgName = this.keepFileName ? '|' + Base64.encodeURI(fileName) : ''
      const filenameMd5 = name + (+new Date())
      const fileEx = fileInfo.length >= 2 ? fileInfo.pop() : ''
      const md5Fid = md5(fileName + new Date() + Math.random())
      return `${md5Fid}${orgName}.${fileEx}`
    },
    getNewFileKey (fileName) {
      const { customDir, ossAccessToken: { dir } } = this
      return `${dir}${customDir}${this.getNewFileName(fileName)}`
    },
    handleImgData (file) {
      const { imgData } = this
      const key = this.getNewFileKey(file.name)
      Object.assign(imgData, { key }, this.handledToken)
    },
    /* business */
    uploadSuccess (res, file, fileList) {
      const { resCheck } = apiConfig
      if (resCheck(res)) {
        this.$emit('on-success', res.data, file, fileList)
      } else {
        errorHandler(res)
      }
      this.upLoading = false
    },
    uploadError (err, file, fileList) {
      errorHandler('图片上传失败，请稍后重试', err)
      this.upLoading = false
    },
    beforeUpload (file) {
      const { type, size } = file
      if (!this.checkFileType(type, file)) {
        this.errorTip('文件类型有误！')
        return false
      } else if (!this.checkFileSize(size)) {
        this.errorTip(`文件大小超过限制！,单文件最大不超过${byteStringify(size)}`)
        return false
      }
      if (this.checkOssExpired()) {
        return new Promise(this.getOssAccessToken).then(() => {
          this.prepareUpload(file)
        }).catch(e => {
          console.log(e)
        })
      } else {
        this.prepareUpload(file)
      }
    },
    checkOssExpired () {
      const { expireTime } = this.$store.getters.ossAccessToken
      return !expireTime || (+new Date() > expireTime)
    },
    prepareUpload (file) {
      const { attach } = this
      attach && (file.attach = this.$_.cloneDeep(attach))
      this.handleImgData(file)
      this.upLoading = true
    },
    getOssAccessToken (resolve, reject) {
      this.$fetch(getOssAccessToken).done(data => {
        if (data) {
          data.expireTime = +new Date() + data.expire * 1000
          this.$store.commit('SET_OSS_ACCESS_TOKEN', data)
          resolve && resolve()
        } else {
          reject && reject()
        }
      }).faile(e => {
        reject && reject(e)
      })
    },
    /* events */
    errorTip (msg) {
      this.$message.error(msg)
    }
  }
}
</script>
