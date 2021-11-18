import request from '../utils/request';

export function getHistoryList(userId) {
  return request({
    url: '/history/list',
    method: 'get',
    params: { userId },
  });
}

export function addHistory(data) {
  return request({
    url: '/history/add',
    method: 'post',
    data,
  });
}
