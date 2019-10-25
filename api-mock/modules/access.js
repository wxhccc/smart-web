const { pick } = require('lodash')

const columns = {
  'account': '@WORD',
  'nick': '@NAME'
}
function checkoutColumns (keys, { page = 1, size = 20 }, customKeys) {
  return [{
    'id|+1': (page - 1) * size + 1,
    ...pick(columns, keys),
    ...customKeys
  }]
}
const userColumn = {
  'avatar': '@URL',
  'roleIds': '@RANGE(100)',
  'state': 1,
  'dataStrategy': 0,
  'groupId': 3,
  'creator': 'admin',
  'createdAt': '@DATETIME',
  'groupListIds': null,
  'roleNames': ['管理员']
}

module.exports = function (mockScript) {
  return {
    '/access/users': {
      '$GET': req => mockScript.list(checkoutColumns(['account', 'nick'], req.query, userColumn), req.query.page, req.query.size),
      '$POST': mockScript.submit(true)
    },
    '/access/users/:id': {
      '$GET': mockScript.getJsonFile('access/users/detail'),
      '$PUT': mockScript.submit()
    },
    '/access/roles/': {
      '$GET': req => mockScript.getJsonFile(req.path),
      '$POST': mockScript.submit(true)
    },
    '/access/roles/:id': {
      '$PUT': mockScript.submit()
    },
    '/access/groups/': {
      '$GET': req => mockScript.getJsonFile(req.path),
      '$POST': mockScript.submit(true)
    },
    '/access/groups/:id': {
      '$PUT': mockScript.submit()
    }
  }
}
