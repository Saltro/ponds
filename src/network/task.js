import request from '../utils/request';

export function getTaskList(userId) {
  return request({
    url: '/task/list',
    method: 'get',
    params: { userId }
  });
}
