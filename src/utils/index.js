import { mergeWith } from 'lodash'
import LocalStore from '@wxhccc/ui-extend/src/utils/storage'
export * from './keyValueMap'
export * from './formatter'
export { default as md5 } from 'md5'
export * from '@wxhccc/ui-extend/lib/utils'

/** 全局的storage命名空间，保证系统内所有本地限定在范围内 **/
export const Storage = LocalStore.namespace('SMARTWEB')

/** 处理空字符串或undefined,返回制定格式的占位字符 **/
export function emptyCell (value) {
  return (value || value === 0) ? value : '--'
}

/* 使用安全方式克隆plain object */
export function cloneJsonObj (source) {
  try {
    return JSON.parse(JSON.stringify(source))
  } catch (e) {}
}

/***
** 使用lodash的mergeWith合并对象,规则为数组自动拼接
* {object list} args 需要合并的对象序列或数组
** 返回值: {object} 合并后的新对象
***/
export function mergeObj (...args) {
  return mergeWith(...args, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}

// 关于浮点数运算方法，可安装bignumber.js库
