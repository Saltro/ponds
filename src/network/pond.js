import request from '../utils/request';

export function getPondList() {
  return request({
    url: '/pond/list',
    method: 'get',
  });
}

// interface SortProps {
//   // 要重新排序的item
//   fromId: number,
//   // 目标item
//   referenceIs: number,
//   // 放在目标的前还是后
//   //tag用于辅助排序
//   tag: number
//   type: 'before' | 'after'
// }
// data: SortProps
export function reorderPonds(data) {
  return request({
    url: '/pond/reorder',
    method: 'post',
    data,
  });
}
