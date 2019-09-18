import mixins from '../../mixins'
import { mergeObj } from '@/utils'
import { regexRuleCreator } from '@/utils/validate'
import { createInputFormItem, createFfiRulesProps } from '@wxhccc/ui-extend/src/optionals'

const field = (prop, required) => createInputFormItem(
  createFfiRulesProps('手机号', required, [regexRuleCreator('telphone', '手机号码格式有误')]),
  prop,
  {
    placeholder: '请输入手机号码',
    maxlength: 11
  }
)
/* 默认数据部分，可单独导出 */
export function fieldData (prop = 'telphone', required, config = {}) {
  return mergeObj({}, field(prop, required), config)
}
export default {
  name: 'FormItemTelphone',
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.prop, this.required, this.config)
    }
  }
}
