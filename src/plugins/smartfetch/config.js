import { Notification } from 'element-ui'
import store from '@/store'
import router from '@/router'

const notifyQueue = []
export function notifyMsg (msg) {
  if (notifyQueue.includes(msg)) return
  notifyQueue.push(msg)
  Notification.error({
    title: '系统提示',
    message: msg,
    customClass: 'systemMessage',
    onClose: () => {
      const msgIndex = notifyQueue.indexOf(msg)
      msgIndex >= 0 && notifyQueue.splice(msgIndex, 1)
    }
  })
}
const statusWarn = {
  '400': '请求错误',
  '404': '请求地址不存在',
  '405': '请求方式错误',
  '500': '服务器维护中，请稍后再试'
}

export function errorHandler (msg, error, response, curtomHandler) {
  const { status } = response || {}
  switch (status) {
    case 401:
      store.commit('LOGIN_OUT')
      router.push({ name: 'Login' })
      break
    default:
      break
  }
  const { code, message } = response && response.data ? response.data : {}
  msg = message || msg
  curtomHandler ? curtomHandler(code, notifyMsg) : notifyMsg(msg)
}

const { apiConfig: { url }, token } = store.getters

export default {
  baseConfig: [
    {
      key: 'default',
      headers: { Authorization: token },
      baseURL: url
    }, {
      key: 'third'
    }, {
      key: 'local',
      headers: { Authorization: token },
      baseURL: ''
    }
  ],
  errorHandle: errorHandler,
  resCheck: resjson => !resjson.code,
  statusWarn,
  forceAxios: true
}
