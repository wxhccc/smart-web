import adminComponents from './routeComponents'
import { adminDynaRoutes, adminStaticRoutes, adminTplComponents as tplComps } from './adminRoutes'
import { cloneDeep } from 'lodash'

/**
 * 根据接口返回的权限菜单数据生成菜单和路由数据
 * 菜单及路由处理----入口
**/
export function handleMenuInfo (menuInfo) {
  let result = { menu: [], dynaRoutes: [] }
  if (Array.isArray(menuInfo)) {
    // 获取本地动态路由列表
    const dynaRoutes = adminDynaRoutes()
    // 生成本地可用路由名数组
    const accessRouteNames = getAccessRouteNames(dynaRoutes)
    try {
      // 生成菜单数据和路由权限
      const { menu, routeActions, virtualRoutes } = handleMenusInfo(menuInfo, accessRouteNames)
      // 生成动态路由数据
      result.dynaRoutes = handleRoutes(routeActions, dynaRoutes.concat(virtualRoutes))
      result.menu = menu
    } catch (e) { console.log(e) }
  }
  return result
}
/** 检查变量是否是函数，如果是将指定参数传入并返回值 **/
function getFnValue (value, ...args) {
  return typeof value === 'function' ? value(...args) : value
}
/* 根据本地文件生成可用路由name数组 */
function getAccessRouteNames (dynaRoutes) {
  let names = []
  dynaRoutes.forEach(route => {
    const { name, component } = route
    ;(adminComponents[name] || adminComponents[component]) && names.push(name)
  })
  return names
}
/**
 * 检查当前菜单项是否有索引子菜单
 * 如果存在则检出当前菜单索引子菜单，否则返回当前菜单本事
*/
function checkoutIndexItem (item) {
  if (!item.index || !item.children || !item.children.length || item.children[0].isMenu) return item
  const searchChildDeep = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].key === item.index) return children[i]
      const indexItem = searchChildDeep(children[i].children)
      if (indexItem) return indexItem
    }
  }
  return searchChildDeep(item.children) || item
}
/* 处理使用模版页的虚拟菜单路由，转换为有效路由对象  */
function transformTplToRoute (tplName, routeName) {
  const { path, meta } = tplComps[tplName]
  if (!path) return null
  let route = {
    path: getFnValue(path, routeName, tplName),
    name: routeName,
    component: tplName
  }
  meta && (route.meta = getFnValue(meta, routeName, tplName))
  return route
}
/* 处理菜单权限数据，生成菜单数据和路由权限点数据 */
function handleMenusInfo (menuInfo, accessRouteNames) {
  let result = { menu: [], routeActions: {}, virtualRoutes: [] }
  // 检查菜单项是否是最后一层
  const checkItemLastLvl = item => (!item.children || !item.children.length || !item.children[0].isMenu)
  // 用接口权限数据递归生成满足条件的菜单数据
  const getMenuItem = (menuArr, item) => {
    const { name: title, icon, template } = item
    // 检查当前菜单是否关联到下级菜单
    const workItem = checkoutIndexItem(item)
    const { key: name, children } = workItem
    // 检查当前层级是否是菜单最后一级
    const isLastLvl = checkItemLastLvl(workItem)
    const isTemplate = Boolean(tplComps[template])
    // 当菜单为最后一级时检查路由name是否有对应有效路由组件或模版组件, 无则跳过
    if (isLastLvl && !accessRouteNames.includes(name) && !isTemplate) return
    let menuItem = { title, name, icon }
    if (children && children.length) {
      menuItem.children = []
      children.forEach(ci => getMenuItem(menuItem.children, ci))
    }
    // 将虚拟路由添加到virtualRoutes中
    if (isTemplate) {
      const vroute = transformTplToRoute(template, name)
      vroute && result.virtualRoutes.push(vroute)
    }
    // 尝试获取路由的action
    result.routeActions[name] = isLastLvl && children && children.length ? children.map(item => (item.key)) : true
    menuArr.push(menuItem)
  }
  menuInfo.forEach(item => getMenuItem(result.menu, item))
  return result
}

/* 处理路由数据 */
function handleRoutes (rightsRoute, dynaRoutes) {
  // 先递归处理权限数据
  // 再处理路由部分
  const checkRelevance = (value) => {
    if (typeof value === 'string') {
      return rightsRoute[value]
    } else if (Array.isArray(value) && value.length === 2 && (typeof value[0] === 'string')) {
      let result = rightsRoute[value[0]]
      typeof value[1] === 'function' && result && !value[1](Array.isArray(result) ? result : []) && (result = false)
      return result
    } else {
      return false
    }
  }

  return dynaRoutes.filter(item => {
    const { name, powerRelevance, meta } = item
    // 检测路由是否有权限点
    let actions = rightsRoute[name]
    if (!actions && !(actions = checkRelevance(powerRelevance))) {
      return false
    }
    delete item.powerRelevance
    if (Array.isArray(actions)) {
      !meta && (item.meta = {})
      Object.assign(item.meta, { actions })
    }
    return true
  })
}

/** 给路由数据添加组件 **/
export function routesAddComponents (routes) {
  const addComponent = (item) => {
    const { name, children, component } = item
    const componentName = typeof component === 'string' ? component : name
    typeof component !== 'function' && name && adminComponents[componentName] && (item.component = adminComponents[componentName])
    Array.isArray(children) && children.length && children.forEach(addComponent)
  }
  routes.forEach(addComponent)
}

/** 整合路由数据并添加到router **/
export function addDynamicRouters ($router, routes = []) {
  let originRoutes = $router.options.routes
  let newRoutes = [{ path: '*', redirect: '/404' }]
  let adminRoute = originRoutes.find(item => (item.name === 'Admin'))
  if (adminRoute) {
    const staticRoutes = adminStaticRoutes()
    const adminRoutes = cloneDeep(routes).concat(staticRoutes)
    routesAddComponents(adminRoutes)
    adminRoute.children.push(...adminRoutes)
    newRoutes.unshift(adminRoute)
  }
  $router.addRoutes(newRoutes)
}
