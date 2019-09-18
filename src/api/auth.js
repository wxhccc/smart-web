// authentication apis(鉴权相关)
import { request } from '@wxhccc/smartfetch'
// login
export function login (data) {
  return request('/auth/login', data, 'POST')
}
// logout
export function logout (data) {
  return request('/auth/logout', data, 'POST')
}
// 获取当前用户权限树
export function getMenuInfo (data) {
  return request('/auth/menu', data)
}
