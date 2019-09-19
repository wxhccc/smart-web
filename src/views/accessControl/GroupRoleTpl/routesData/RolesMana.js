import { getCommonOptions } from '../common'
import RoleRightsSetting from '../templates/RoleRightsSetting'
import { getRolesList, deleteRoles } from '@/api/access'

const alertInfos = [
  { title: '什么是角色？', description: '角色是权限功能点的集合，是快速给用户分配权限的介质' },
  { title: '什么是权限功能点？', description: '系统中各项操作及功能的控制节点，包括页面权限和页面操作权限' },
  { title: '什么是子角色',
    description: [
      '- 子角色是为有上下层级关系的角色类型提供的快速管理的高级功能',
      '- 子角色的可分配权限点会限制在父角色的权限点范围内',
      '- 父角色删除权限点时，子角色内对应权限点也会被移除。父角色添加权限点时，子角色不会默认获取。'
    ]
  }
]

export default {
  ...getCommonOptions(['新增角色', '请输入角色名称'], ['角色名称'], ['子角色', '删除角色后会使自身及子角色所涉及的角色失去对应权限点，确定要继续？'], true),
  pageTemplate: RoleRightsSetting,
  alertInfos,
  getListParamsHandle (params) {
    params.qName = params.name
    return params
  },
  handledApis: {
    getPageList: getRolesList,
    deleteRecord: deleteRoles
  }
}
