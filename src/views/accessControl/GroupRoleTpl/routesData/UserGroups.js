import { getCommonOptions } from '../common'
import GroupEditForm from '../templates/GroupEditForm'
import { getGroupsList, deleteGroups } from '@/api/access'

const alertInfos = [
  {
    title: '什么是用户组',
    description: '用户组是用来维护用户在系统中所属的组织结构的'
  },
  {
    title: '用户组有什么作用呢',
    description: [
      '- 用户组可用来划分用户所属组织',
      '- 用户组能控制用户能访问到的数据的范围'
    ]
  }
]

export default {
  ...getCommonOptions(['新增用户组', '请输入用户组名称'], ['用户组名称'], ['子用户组', '删除用户组后会使自身及子用户组所涉及的角色处于无归宿状态，可能会影响用户的数据访问范围，确定要继续？'], true),
  pageTemplate: GroupEditForm,
  alertInfos,
  getListParamsHandle (params) {
    params.qName = params.name
    return params
  },
  handledApis: {
    getPageList: getGroupsList,
    deleteRecord: deleteGroups
  }
}
