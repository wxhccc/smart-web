<template>
  <el-button
    class="fi-verify-btn"
    v-bind="handleProps"
    :disabled="hasSend"
    @click="handleSending"
  >
    <ue-ticker v-if="hasSend" :duration="duration"  @on-timeout="resetBtnState">后重新发送</ue-ticker>
    <template v-else>发送验证码</template>
  </el-button>
</template>
<script>
import { Ticker } from '@wxhccc/ui-extend'
export default {
  name: 'FormItemVerifyBtn',
  components: {
    [Ticker.name]: Ticker
  },
  props: {
    props: Object,
    checkTelphone: Function,
    sendVerifyCode: Function,
    duration: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      hasSend: false
    }
  },
  computed: {
    handleProps () {
      return this.props
    }
  },
  methods: {
    /* events */
    // 处理发送按钮点击事件
    handleSending () {
      const { checkTelphone, sendVerifyCode } = this
      const checkRes = checkTelphone()
      if (checkRes && typeof sendVerifyCode === 'function') {
        this.hasSend = true
        sendVerifyCode()
      }
    },
    // 处理倒计时
    resetBtnState () {
      this.hasSend = false
    }
  }
}
</script>