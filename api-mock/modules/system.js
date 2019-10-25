
module.exports = function (mockScript) {
  return {
    '/system/rights': {
      '$POST': mockScript.submit()
    },
    '/system/configs': {
      '$POST': mockScript.submit()
    },
    '/system/tplpages/:id': {
      '$GET': mockScript.getJsonFile('system/tplpages/detail'),
      '$PUT': mockScript.submit()
    }
  }
}
