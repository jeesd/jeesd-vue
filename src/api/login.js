import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
	
  let grant_type = 'password'
  let scope = 'auth'
  let username = parameter.username
  let password = parameter.password
  return axios({
    url: '/auth/oauth/token',
    method: 'post',
    data: qs.stringify({"username":username,"password":password,"grant_type":grant_type,"scope":scope}),
	headers: { 
	  'Authorization': 'Basic amVlc2Q6ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U=',
	  'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
