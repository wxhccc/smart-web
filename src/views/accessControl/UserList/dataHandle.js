import { createInputFormItem, createSelectFormItem, checkoutFormItems, createTableColumn, dateFormatter } from '@/common'
import { editSkipBtn, stateBtn } from '@/common/commonData/actionBtns'

// 生成页面table列数据
export const tbColumnsCreator = ({ state, strategy }) => [
  createTableColumn('账号', 'account'),
  createTableColumn('昵称', 'nick'),
  createTableColumn('角色', 'roleNames', { formatter: (row, column, cellValue) => Array.isArray(cellValue) ? cellValue.join('、') : '' }),
  createTableColumn('状态', 'state', typeof state === 'function' ? { formatter: (row, column, cellValue) => state(cellValue) } : {}),
  createTableColumn('创建者', 'creator'),
  createTableColumn('创建时间', 'createdAt', dateFormatter('')),
  { label: '操作', width: '270px', action: [] }
]
// 生成页面搜索表单项数据
export const formItemsCreator = (stateOptions) => checkoutFormItems({
  '_account': createInputFormItem('账号', 'qAccount', '请输入账号，支持模糊搜索'),
  '_state': createSelectFormItem('状态', 'state', stateOptions, -2),
  'time': { props: { label: '创建时间' } }
})
// 生成权限控制之后的操作按钮
export function operationCreator () {
  let btns = []
  this.RouteRights.includes('edit') && btns.push({
    text: '新增用户',
    btnKey: 'add',
    events: {
      click: this.skipToAdd
    }
  })
  return {
    show: true,
    items: btns
  }
}
// 生成表格操作列按钮
export function actionBtnsCreator () {
  let btns = []
  const confirmMsg = (isAccess, keyWord) => (`${keyWord}后，该账号将会${isAccess ? '被冻结' : '解初冻结'}，确定${keyWord}吗?`)
  this.RouteRights.includes('edit') && btns.push({
    text: '添加到用户组',
    btnKey: 'groupSetting',
    click: this.groupSettingHandle
  }, editSkipBtn({ click: this.skipToDetail }))
  this.RouteRights.includes('freeze') && btns.push(stateBtn({ click: this.handleRecordState }, confirmMsg))
  return btns
}
