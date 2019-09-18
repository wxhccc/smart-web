import mixins from '../../mixins'
import { FormFields } from '@wxhccc/ui-extend'
import { mergeObj } from '@/utils'
import { createInputFormItem } from '@/common'

export function verifyCodeRules (required, message) {
  return (required ? [{ required: true, message, trigger: 'blur' }] : [])
}
const passWordField = (prop, required) => createInputFormItem({
  label: '密码',
  rules: verifyCodeRules(required, '请输入密码')
}, prop, {
  placeholder: '请输入密码',
  type: 'password'
})

const confirmPwdField = (prop, required, pwdProp, formData) => createInputFormItem({
  label: '确认密码',
  rules: verifyCodeRules(required, '请输入确认密码').concat([
    {
      validator (rule, value, callback) {
        if (formData[pwdProp] !== value) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      message: '两次输入密码不一致',
      trigger: 'blur'
    }
  ])
}, prop, {
  placeholder: '再次确认密码',
  type: 'password'
})
/* 默认数据部分，可单独导出 */
export function fieldData (propKeys = {}, required, formData = {}, configs = {}) {
  let pwdProp = propKeys.password || 'password'
  const pwdField = mergeObj({}, passWordField(pwdProp, required), configs.password)
  pwdProp = Array.isArray(pwdField.prevProp) ? pwdField.prevProp.concat([pwdProp]).join('.') : pwdProp
  return [
    pwdField,
    mergeObj({}, confirmPwdField(propKeys.confirmPwd || 'confirmPwd', required, pwdProp, formData), configs.confirmPwd)
  ]
}
export default {
  name: 'FormItemPasswords',
  components: {
    [FormFields.name]: FormFields
  },
  props: {
    fields: Object,
    propKeys: Object
  },
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.propKeys, this.required, this.value, this.configs)
    }
  },
  methods: {
  }
}
