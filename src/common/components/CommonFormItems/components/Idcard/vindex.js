import mixins from '../../mixins'
import { mergeObj } from '@/utils'
import { regexRuleCreator, idCardValidate } from '@/utils/validate'
import { createInputFormItem, createFfiRulesProps } from '@wxhccc/ui-extend/src/optionals'

const field = (prop, required) => createInputFormItem(
  createFfiRulesProps('身份证号码', required, [
    regexRuleCreator('idCard', '身份证号码格式有误', 'change'),
    { validator: idCardValidate, message: '身份证号码不合法', trigger: 'change' }
  ]),
  prop,
  { placeholder: '请输入身份证号码', maxlength: 18 }
)
/* 默认数据部分，可单独导出 */
export function fieldData (prop = '', required, config = {}) {
  return mergeObj({}, field(prop, required), config)
}
export default {
  name: 'FormItemIdcard',
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.prop, this.required, this.config)
    }
  }
}
