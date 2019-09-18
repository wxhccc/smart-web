import { createTableColumn } from '@/common'
import { editFuncBtn, deleteBtn } from '@/common/commonData/actionBtns'
import { SearchInput } from '@wxhccc/ui-extend'
import { array2tree } from '@wxhccc/es-util'

const nameFormatter = (row, column, cellValue, index) => (`${!row.isTree ? row.parentIds.map(item => '>').join('') + ' ' : ''}${cellValue}`)

// 生成页面table列数据
export const tbColumnsCreater = (label = '名称') => [
  createTableColumn(label, 'name', { align: 'left', className: 'record-name-column', formatter: nameFormatter }),
  createTableColumn('创建者', 'creator'),
  createTableColumn('创建时间', 'createdAt'),
  { label: '操作', width: '290px', action: [] }
]

// 生成权限控制之后的操作按钮
export function operationCreater (btnText, placeholder = '名称') {
  return {
    show: true,
    items: [
      {
        text: btnText,
        btnKey: 'add',
        isHide () { return !this.RouteRights.includes('edit') },
        events: { click: 'createNewRecord' }
      },
      {
        component: SearchInput,
        props () {
          return { placeholder, value: this.RSD.extraForm.name }
        },
        events: {
          input (value) { this.RSD.extraForm.name = value }
        }
      }
    ]
  }
}
// 生成操作按钮
export function actionBtnsCreater (childBtnText, confirmMsg) {
  return function () {
    const btns = [
      {
        key: 'add',
        rightKey: 'edit',
        text: childBtnText,
        props: { icon: 'el-icon-plus' },
        click: this.createNewRecord
      },
      editFuncBtn({ click: this.editRecord }),
      deleteBtn(this.deleteRecord, { confirmMsg })
    ]
    return btns.filter(btn => this.RouteRights.includes(btn.rightKey || btn.key))
  }
}
// 导出模块公共配置
export function getCommonOptions (opeArgs = [], tbArgs = [], actBtnsArgs = [], treeWithParent) {
  return {
    RSD: { extraForm: { name: '' }, OPELOCKS: {} },
    operation: operationCreater(...opeArgs),
    tableColumns: tbColumnsCreater(...tbArgs),
    actionBtns: actionBtnsCreater(...actBtnsArgs),
    pageListFilter (data) {
      if (!this.RSD.extraForm.name) {
        data.rows = array2tree(data.rows, treeWithParent ? { parentRefKey: 'Parent' } : {})
      }
      return data
    }
  }
}
