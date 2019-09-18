import { createInputFormItem, createSelectFormItem, createFfiRulesProps } from '@/common'
import { passwordsData, telphoneData } from '@/common/components/CommonFormItems'

export function getFormFields (isEdit, formConfig, formData) {
  const { dataStrategy, roleOptions } = formConfig
  return [
    createInputFormItem(createFfiRulesProps('账号', true), 'account', isEdit ? { disabled: true } : '请输入账号，仅支持字母和数字'),
    createInputFormItem('昵称', 'nick', '请输入账号昵称，缺省时将用账号名替代'),
    ...(isEdit ? [] : passwordsData({}, true, formData)),
    createSelectFormItem('角色', 'roleIds', roleOptions, false, {
      multiple: true,
      filterable: true,
      placeholder: '请选择角色'
    }),
    createSelectFormItem(createFfiRulesProps('数据访问权限', '请选择数据访问权限'), 'dataStrategy', dataStrategy),
    telphoneData('telphone')
  ]
}
