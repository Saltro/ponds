import request from '../utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function me () {
  return request({
    url: '/user/me',
    method: 'get'
  })
}
