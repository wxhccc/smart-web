// 通用接口
import { request } from '@wxhccc/smartfetch'
// get ali-oss access token
export function getOssAccessToken (data) {
  return request('/oss/access', data)
}
