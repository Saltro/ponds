import request from '../utils/request';

export function getTaskList(userId) {
  return request({
    url: '/task/list',
    method: 'get',
    params: { userId }
  });
}

export function addTask(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  });
}

export function editTask(data) {
  return request({
    url: '/task/edit',
    method: 'post',
    data
  });
}

export function getTask(id) {
  return request({
    url: '/task/info',
    method: 'get',
    params: { id }
  });
}

// interface SortProps {
//   fromId: number;
//   referenceId: number;
//   type: 'before' | 'after';
//   fromPondId?: number;
//   toPondId?: number
// }

export function reorderTasks(data) {
  return request({
    url: '/task/reorder',
    method: 'post',
    data
  });
}
