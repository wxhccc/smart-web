import { cloneDeep } from 'lodash'
import { checkoutBy } from '@wxhccc/es-util'
import { createInputFormItem, createDateFormItem, createTableColumn, formatters } from '@wxhccc/ui-extend/lib/optionals'

export * from '@wxhccc/ui-extend/lib/optionals'

export const formItemsFn = () => ({
  mobile: createInputFormItem('手机号', 'mobile', '客户手机号'),
  idcard: createInputFormItem('身份证号', 'idcard', '客户身份证号'),
  date: createDateFormItem('日期', 'date', 'date'),
  time: createDateFormItem('时间', 'daterange', 'daterange')
})

export const tbColumnsFn = () => ({
  // 订单部分
  'index': createTableColumn('序号', '', { type: 'index', width: '80px' }),
  'idcard': createTableColumn('身份证号', 'idcard'),
  'mobile': createTableColumn('手机号', 'mobile'),
  'money': createTableColumn('金额', 'money', { formatter: formatters.moneyFormatter }),
  'action': { label: '操作', action: [] }
})

export function checkoutTableColumns (keys, originData) {
  const tbColumns = originData || tbColumnsFn()
  return checkoutBy(tbColumns, keys)
}

export function checkoutFormItems (keys, originData) {
  const formItems = originData || formItemsFn()
  return checkoutBy(formItems, keys)
}

export function filterExportParams (params) {
  if (!params) return params
  let filterParams = cloneDeep(params)
  filterParams.size && (delete filterParams.size)
  filterParams.page && (delete filterParams.page)
  return filterParams
}

// 导出表单页面通用配置数据
export function commonFormProps (isInline, props = {}) {
  return Object.assign({ labelWidth: 'auto' }, isInline ? {
    class: 'sw-common-form inline-form',
    inline: true
  } : {
    class: 'sw-common-form'
  }, props || {})
}
// 创建ModulePane组件用模块信息
export const createModuleInfo = (title, key, component, props, others) => ({
  title,
  key,
  component,
  props,
  ...others
})
