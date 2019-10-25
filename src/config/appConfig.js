export default function () {
  return {  
    accountState: [
      { 'value': -1, 'label': '未激活' },
      { 'value': 0, 'label': '冻结' },
      { 'value': 1, 'label': '正常' }
    ],
    dataStrategy: [
      { 'value': 0, 'label': '个人数据策略' },
      { 'value': 1, 'label': '组内数据策略' },
      { 'value': 2, 'label': '管理员数据策略' }
    ]
  }
}
