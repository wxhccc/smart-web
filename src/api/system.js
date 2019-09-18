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
