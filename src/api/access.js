// user manage module apis
import { request } from '@wxhccc/smartfetch'

// get users list
export function getUserList (data) {
  return request('/access/users', data)
}
// get user detail info
export function getUserInfo (id, data) {
  return request(`/access/users/${id}`, data)
}
// create new user
export function addUser (data) {
  return request('/access/users', data, 'POST')
}
// update user's info
export function updateUser (uid, data) {
  return request(`/access/users/${uid}`, data, 'PUT')
}
// get the access roles options list of current user
export function getAcessRoleOptions (data) {
  return request('/access/options/roles', data)
}
// get group list by cascade
export function searchLevelGroupList (data) {
  return request('/access/options/groups', data)
}
// get groups list
export function getGroupsList (data) {
  return request('/access/groups', data)
}
// add new group
export function addUserGroup (data) {
  return request('/access/groups', data, 'POST')
}
// update group info
export function updateUserGroup (gid, data) {
  return request(`/access/groups/${gid}`, data, 'PUT')
}
// delete groups
export function deleteGroups (id, data) {
  return request(`/access/groups/${id}`, data, 'DELETE')
}
// get roles list
export function getRolesList (data) {
  return request('/access/roles', data)
}
// add new role
export function addRole (data) {
  return request('/access/roles', data, 'POST')
}
// update role info
export function updateRole (rid, data) {
  return request(`/access/roles/${rid}`, data, 'PUT')
}
// delete roles
export function deleteRoles (id, data) {
  return request(`/access/roles/${id}`, data, 'DELETE')
}
// get access right points
export function getAccessRights (data) {
  return request('/access/rights', data)
}
