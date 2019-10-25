// 通用接口
import { request } from '@wxhccc/smartfetch'
// 获取可配置权限项
export function getNonStaticRights (data) {
  return request('/system/rights', data)
}
// 更新可配置权限项
export function updateNonStaticRights (data) {
  return request('/system/rights', data, 'POST')
}
// 获取所有系统配置项
export function getSystemConfigs (data) {
  return request('/system/configs', data)
}
// 更新可配置权限项
export function updateSystemConfigs (data) {
  return request('/system/configs', data, 'PUT')
}
// 获取模版页面列表
export function getTplPageList (data) {
  return request('/system/tplpages', data)
}

// 获取模版页面详细信息
export function getTplPageInfo (id, data) {
  return request(`/system/tplpages/${id}`, data)
}
// 更新模版页面配置信息
export function updateTplPageInfo (id, data) {
  return request(`/system/tplpages/${id}`, data, 'PUT')
}
