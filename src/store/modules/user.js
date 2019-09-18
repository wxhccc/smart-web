import { Storage } from '@/utils'
import smartfetch from '@wxhccc/smartfetch'

export default {
  state: {
    isLogin: Boolean(Storage('TOKEN')),
    token: Storage('TOKEN') || '',
    userInfo: Storage('USERINFO') || {}
  },
  mutations: {
    LOGIN_IN: (state, token) => {
      state.token = token
      smartfetch.modifyBaseConfigs(baseConfig => {
        baseConfig.forEach(item => {
          if (item.key !== 'third') {
            !item.headers && (item.headers = {})
            item.headers.Authorization = token
          }
        })
      })
      state.isLogin = Boolean(token)
      Storage('TOKEN', token)
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = Object.assign({}, state.userInfo, userInfo)
      Storage('USERINFO', state.userInfo)
    },
    LOGIN_OUT: state => {
      state.isLogin = false
      state.token = ''
      state.userInfo = {}
      Storage(false)
    }
  },
  actions: {
  }
}
