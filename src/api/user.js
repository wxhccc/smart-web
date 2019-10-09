// user center apis
import { request } from '@wxhccc/smartfetch'

// modify user's password
export function modifyPwd (data) {
  return request('/user/password', data, 'PUT')
}
// modify user's profile info
export function modifyUserProfile (data) {
  return request('/user/profile', data, 'PUT')
}
