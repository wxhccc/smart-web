import { createInputFormItem, createSelectFormItem, createTableColumn } from '@/common'
import { editSkipBtn } from '@/common/commonData/actionBtns'

// 生成页面table列数据
export const tbColumnsCreator = ({ state, tplName }) => [
  createTableColumn('KEY', 'key'),
  createTableColumn('名称', 'name'),
  createTableColumn('模版', 'template', {
    formatter: (row, column, cellValue) => tplName(cellValue)
  }),
  createTableColumn('状态', 'state', typeof state === 'function' ? { formatter: (row, column, cellValue) => state(cellValue) } : {}),
  createTableColumn('类型', 'isMenu', {
    formatter: (row, column, cellValue) => (typeof cellValue === 'boolean') ? (cellValue ? '菜单' : '权限点') : ''
  }),
  { label: '操作', action: [] }
]
// 生成页面搜索表单项数据
export const formItemsCreator = (tplOtptions) => ([
  createInputFormItem('页面名称', 'qTitle', '请输入页面标题，支持模糊搜索'),
  createSelectFormItem('模版', 'template', tplOtptions, '')
])

// 生成表格操作列按钮
export function actionBtnsCreator () {
  return [editSkipBtn({ text: '修改配置' })]
}
