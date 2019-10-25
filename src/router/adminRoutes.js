const rememberMeta = (listPageName) => ({ activeTarget: listPageName, remember: true })

/** 固定name（非模版）的动态权限路由列表 **/
export const adminDynaRoutes = () => ([
  /*
  {
    path: '', // 路由路径
    title: '列表页',  // 路由标题，优先级低于动态菜单返回的title
    name: '', // 路由name，全局唯一，建议项目内所有跳转使用name
    meta: {}
  },
  {
    path: '',
    title: '详情页',
    name: '',
    powerRelevance: '',
    meta: {
      activeTarget: '', // 当前路由页面需要点亮的菜单项对应路由，例如详情页时对应的列表页的菜单项仍然会激活
      remember: true // 当前页面是否需要在返回前一页时恢复前一页的数据状态，用于从详情页返回列表页时恢复列表页之前的状态
    }
  }
  */
  {
    path: 'system/rights',
    name: 'SystemRights',
    meta: {}
  },
  {
    path: 'system/configs',
    name: 'SystemConfigs',
    meta: {}
  }
])
/** 模版页的配置信息对象 **/
export const adminTplComponents = {
  /* example
  'PostListTpl': {
    path: routeName => `post/${hyphenate(routeName.replace('Posts', ''))}`,
    tplName: '文章模版页'
  }*/
}
/** 导出模版配置为列表供appConfig使用 **/
export function getTplOptions () {
  return Object.keys(adminTplComponents).map(name => ({
    label: adminTplComponents[name].tplName,
    value: name
  }))
}

/** 后台静态权限路由--静态路由登陆后即可访问 **/
export const adminStaticRoutes = () => ([
  {
    path: 'modifypwd',
    name: 'ModifyPwd',
    static: true
  },
  {
    path: 'userprofile',
    name: 'UserProfile',
    static: true
  },
  {
    path: 'test',
    name: 'TestPage',
    static: true
  }
])
