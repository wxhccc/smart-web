import { createInputFormItem, createSelectFormItem, createFfiRulesProps, createFormFieldItem } from '@/common'
import AvatarEdit from './components/AvatarEdit'
import ObjectArrayField from '@/common/components/ObjectArrayField'

export function baseModuleFieldItems (avatarUrl, onUpdate) {
  return [
    createInputFormItem({ label: '默认用户头像 :', class: 'default-avatar' }, 'defaultAvatar', '请填写图片地址或者上传图片', {
      slots: {
        default: { component: AvatarEdit, props: { url: avatarUrl, onUpdate } }
      }
    })
  ]
}
const valueLabelConfig = (isNumber) => ([
  { prop: 'value', label: 'value', isNumber, colProps: { span: 10 } },
  { prop: 'label', label: 'label', colProps: { span: 14 } }
])

export function dictItemFieldItems (isEdit, isNumber, appConfig) {
  return [
    createInputFormItem(createFfiRulesProps('字段', true, [{ pattern: /^\w+$/, message: '字段必须为合法', trigger: 'blur' }]), 'key', '请填写字段'),
    createInputFormItem(createFfiRulesProps('标题', true), 'describe', '请填写字段'),
    createSelectFormItem('选项值类型', 'valueType', appConfig.dataType, false, { disabled: isEdit }),
    createSelectFormItem('状态', 'state', appConfig.dictItemState, false),
    createFormFieldItem(ObjectArrayField, createFfiRulesProps('选项列表', true), 'value', {
      props: { labelTop: true, keyCfgs: valueLabelConfig(isNumber), prevProp: ['value'] }
    })
  ]
}
