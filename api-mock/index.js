'use strict'
const path = require('path')
delete require.cache[path.resolve(__dirname, './mockScript.js')]
delete require.cache[path.resolve(__dirname, './modules/index.js')]

const mockScript = require('./mockScript')
const modulesApis = require('./modules')
module.exports = Object.assign({
  '/auth/login': mockScript.login,
  '/auth/logout': mockScript.submit(),
  '/user/password': mockScript.submit(),
  '/user/profile': mockScript.submit()
}, modulesApis(mockScript))
