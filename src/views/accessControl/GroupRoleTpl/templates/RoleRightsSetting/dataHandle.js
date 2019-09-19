import { commonFormProps, createFormFieldItem, createInputFormItem, createFfiRulesProps } from '@/common'

export const formProps = commonFormProps(false, { labelWidth: '90px' })

export const roleNamesCreator = (isEdit, hasParent) => ([
  ...(hasParent ? [createFormFieldItem(null, '父角色名称', 'pname', {}, { text: true })] : []),
  createInputFormItem(createFfiRulesProps('角色名称', true), 'name', { placeholder: '请输入角色名称', maxlength: 20 })
])

export const rightsRule = [
  { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
]
