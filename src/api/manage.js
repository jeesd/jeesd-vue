import { axios } from '@/utils/request'

const api = {
  user: '/user/list',
  editUser: '/user/modify',
  addUser: '/user/users',
  userRoles: '/user/roles',
  role: '/role/list',
  roleNoPager: '/role/all',
  roleUser: '/role/list/user',
  editRole: '/role/modify',
  addRole: '/role/roles',
  roleCheckedPermissions: 'role/checked/permissions',
  rolePermissions: '/role/permissions',
  service: '/service',
  permission: '/permission/list',
  permissionNoPager: '/permission/list',
  permissionTree: '/permission/tree',
  editPermission: '/permission/modify',
  addPermission: '/permission/permissions',
  selectMenus: '/permission/menu/list',
  deptNoPager: '/dept/list',
  editDept: '/dept/modify',
  addDept: '/dept/depts',
  selectDepts: '/dept/tree',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function editUser (parameter) {
  return axios({
    url: api.editUser,
    method: 'put',
    params: parameter
  })
}

export function addUser (parameter) {
  return axios({
    url: api.addUser,
    method: 'post',
    params: parameter
  })
}

export function userRoles (userId, roleIds) {
  return axios({
    url: api.userRoles,
    method: 'post',
    params: {userId: userId, roleIds: roleIds},
	headers: {
		'Content-Type': 'multipart/form-data'
	}
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getRoleAll (parameter) {
  return axios({
    url: api.roleNoPager,
    method: 'get',
    params: parameter
  })
}

export function getRoleByUser (parameter) {
  return axios({
    url: api.roleUser,
    method: 'get',
    params: {userId: parameter},
	headers: {
		'Content-Type': 'multipart/form-data'
	}
  })
}

export function editRole (parameter) {
  return axios({
    url: api.editRole,
    method: 'put',
    params: parameter
  })
}

export function addRole (parameter) {
  return axios({
    url: api.addRole,
    method: 'post',
    params: parameter
  })
}

export function rolePermissions (roleId, permissionIds) {
	return axios({
    url: api.rolePermissions,
    method: 'put',
    params: {roleId: roleId, permissionIds: permissionIds},
	headers: {
		'Content-Type': 'multipart/form-data'
	}
  })
}

export function getRoleCheckedPermissions (parameter) {
	return axios({
    url: api.roleCheckedPermissions,
    method: 'get',
    params: {roleId: parameter.id}
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getPermissionTree (parameter) {
  return axios({
    url: api.permissionTree,
    method: 'get',
    params: parameter
  })
}

export function editPermission (parameter) {
  return axios({
    url: api.editPermission,
    method: 'put',
    params: parameter
  })
}

export function addPermission (parameter) {
  return axios({
    url: api.addPermission,
    method: 'post',
    params: parameter
  })
}

export function selectMenus (parameter) {
  return axios({
    url: api.selectMenus,
    method: 'get',
    params: parameter
  })
}

export function getDepts (parameter) {
  return axios({
    url: api.selectDepts,
    method: 'get',
    params: parameter
  })
}

export function selectDepts (parameter) {
  return axios({
    url: api.deptNoPager,
    method: 'get',
    params: parameter
  })
}

export function editDept (parameter) {
  return axios({
    url: api.editDept,
    method: 'put',
    params: parameter
  })
}

export function addDept (parameter) {
  return axios({
    url: api.addDept,
    method: 'post',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
