export function viewBtn (props) {
  return Object.assign({
    text: '查看',
    key: 'view',
    click: 'skipToDetail'
  }, props || {})
}
export function editSkipBtn (props) {
  return Object.assign({
    text: '编辑',
    key: 'edit',
    click: 'skipToDetail'
  }, props || {})
}
export function editFuncBtn (props) {
  return Object.assign({
    text: '编辑',
    key: 'edit'
  }, props || {})
}

export function stateBtn (props, confirmMsg, stateKey = 'state') {
  return Object.assign({
    text: row => (row[stateKey] === 0 ? '启用' : '禁用'),
    type: 'confirm',
    key: 'disabled',
    confirmMsg: row => {
      const isAccess = row[stateKey] === 1
      const keyWord = isAccess ? '禁用' : '启用'
      return typeof confirmMsg === 'function' ? confirmMsg(isAccess, keyWord) : `${keyWord}后，该条数据将${isAccess ? '不可使用' : '恢复使用'}，确定${keyWord}吗?`
    },
    loadingKey: 'stateSetting',
    btype: row => (row[stateKey] === 1 ? 'info' : 'success'),
    click: 'handleRecordStatus'
  }, props || {})
}

export function deleteBtn (deleteHandler, props) {
  return Object.assign({
    text: '删除',
    type: 'confirm',
    key: 'delete',
    loadingKey: 'deleteing',
    confirmMsg: '确定要删除这条记录吗?',
    btype: 'danger',
    click: typeof deleteHandler === 'function' ? deleteHandler : () => {}
  }, props || {})
}
