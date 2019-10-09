'use strict'
const path = require('path')
delete require.cache[path.resolve(__dirname, './mockScript.js')]
const mockScript = require('./mockScript')
module.exports = {
  '/auth/login': mockScript.login,
  '/auth/logout': mockScript.submit(),
  '/user/password': mockScript.submit(),
  '/user/profile': mockScript.submit()
}
