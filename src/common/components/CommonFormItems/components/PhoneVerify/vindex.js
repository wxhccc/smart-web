import mixins from '../../mixins'
import { FormFields } from '@wxhccc/ui-extend'
import { createInputFormItem } from '@/common'
import { mergeObj } from '@/utils'
import VerifyBtn from './VerifyBtn'
import { fieldData as telphoneData } from '../Telphone/vindex'
export function verifyCodeRules (required) {
  return (required ? [{ required: true, message: '请输入验证码', trigger: 'blur' }] : [])
}
const verifyField = (prop, required, compInstance) => createInputFormItem({
  label: '验证码',
  class: 'fi-verify-code',
  rules: verifyCodeRules(required)
}, prop, '请输入验证码', {
  slots: {
    default: {
      // 按钮的额外参数是当前组件的示例，需要实现手机号的有效性校验
      component: VerifyBtn,
      props: {
        checkTelphone: compInstance.checkTelphone,
        sendVerifyCode: compInstance.sendVerifyCode
      }
    }
  }
})
/* 默认数据部分，可单独导出 */
export function fieldData (props = {}, required, configs = {}, compInstance) {
  return [
    mergeObj({}, telphoneData(props.telphone || 'telphone', required), configs.telphone),
    mergeObj({}, verifyField(props.verifyCode || 'verifyCode', required, compInstance), configs.verifyCode)
  ]
}
export default {
  name: 'FormItemPhoneVerify',
  components: {
    [FormFields.name]: FormFields
  },
  props: {
    configs: Object,
    props: Object,
    formRef: Object,
    sendVerifyCode: Function
  },
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.props, this.required, this.configs, this)
    },
    telphoneProp () {
      const telphoneField = this.handleField && this.handleField[0] ? this.handleField[0] : {}
      const prop = telphoneField.prop || ''
      return Array.isArray(telphoneField.prevProp) ? telphoneField.prevProp.concat([prop]).join('.') : prop
    }
  },
  methods: {
    // 验证手机号是否可用
    checkTelphone () {
      let result = false
      this.formRef && this.formRef.validateField && this.formRef.validateField(this.telphoneProp, (errMsg) => {
        result = !errMsg
      })
      return result
    }
  }
}
