import { mapToObject } from '@wxhccc/es-util'
/***
** 字典转换
* {object} appConfig 系统配置信息对象
* {array} keys 需要转化成key-value形式的对象的appConfig对象中的key数组
** 返回值: {object} 返回新的字典对象
***/
export function configToMap (appConfig, keys) {
  let result = {}
  keys = Array.isArray(keys) ? keys : ['dataType', 'dictItemState', 'accountState', 'dataStrategy']
  appConfig && keys.forEach(item => {
    Array.isArray(appConfig[item]) && (result[item] = mapToObject(appConfig[item], 'value', 'label'))
  })
  return result
}
