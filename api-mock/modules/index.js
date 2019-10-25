/** start 此段代码将清除本目录下所有文件的引用缓存，可在数据稳定后注释 **/
function clearCache () {
  const path = require('path')
  const curPath = path.resolve(__dirname)
  Object.keys(require.cache).forEach(dir => {
    dir.indexOf(curPath) === 0 && delete require.cache[dir]
  })
}
clearCache()
/** end **/
const common = require('./common')

module.exports = function (mockScript) {
  return Object.assign({}, common(mockScript))
}
