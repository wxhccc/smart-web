import { Storage, configToMap } from '@/utils'
import getAppConfig from '@/config/appConfig'
const appConfig = Storage.session('APPCONFIG') || getAppConfig() || {}

export default {
  state: {
    // 接口apis地址map
    apiConfig: window.API_CONFIG || { url: '' },
    // 左侧主菜单数据
    sidebar: {
      // 菜单是否展开
      opened: typeof Storage('SIDEBARSTATUS') === 'boolean' ? Storage('SIDEBARSTATUS') : true,
      // 菜单数据数组
      menuItems: [],
      // 第一个有权限的菜单路由name
      firstRoute: ''
    },
    // ListPageTpl记录页面路由name
    rememberRoute: '',
    // 当前页面是否处于表单记录状态
    remember: false,
    // 系统配置数据列表map
    appConfig,
    // 系统配置数据key-value对照map
    cfgKeyValueMap: configToMap(appConfig),
    // oss token 缓存数据
    ossAccessToken: Storage('OSSACCESSTOKEN') || {}
  },
  mutations: {
    SET_APP_CONFIG: (state, config) => {
      state.appConfig = Object.assign({}, state.appConfig, config || {})
      state.cfgKeyValueMap = configToMap(appConfig)
      Storage('APPCONFIG', state.appConfig)
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      Storage('SIDEBARSTATUS', state.sidebar.opened)
    },
    SET_SIDEBAR_MENU: (state, data) => {
      state.sidebar.menuItems = Array.isArray(data) ? data : []
    },
    SET_FIRST_ROUTE: (state, routeName) => {
      state.sidebar.firstRoute = routeName
    },
    SET_REMEMBER: (state, remember) => {
      state.remember = remember
    },
    SET_REMEMBER_ROUTE: (state, routeName) => {
      state.rememberRoute = routeName
    },
    SET_OSS_ACCESS_TOKEN: (state, ossToken) => {
      if (!ossToken || !ossToken.expireTime) return
      state.ossAccessToken = ossToken
      Storage('OSSACCESSTOKEN', ossToken)
    }
  },
  actions: {
  }
}
