export default {
  // 属性部分
  apiConfig: state => state.app.apiConfig,
  sidebar: state => state.app.sidebar,
  remember: state => state.app.remember,
  rememberRoute: state => state.app.rememberRoute,
  appConfig: state => state.app.appConfig,
  ossAccessToken: state => state.app.ossAccessToken,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,

  // 函数部分
  switchFilter: state => key => value => (state.app.cfgKeyValueMap[key] ? state.app.cfgKeyValueMap[key][value] : '')
}
