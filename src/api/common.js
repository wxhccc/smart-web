// 通用接口
import { request } from '@wxhccc/smartfetch'
// 获取可配置权限项
export function getAccessRights (data) {
  return request('/common/rights', data)
}
// get ali-oss access token
export function getOssAccessToken (data) {
  return request('/oss/access', data)
}
// get province-city-dist data
export function getProvCityData (data) {
  return request('/common/areas', data)
}
