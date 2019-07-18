import request from '@/utils/request'

/**
 * 获取投放时间列表
 * @param query
 */
export function adschedulesList(query) {
  return request({
    url: '/api/v2/adschedules',
    method: 'get',
    params: query
  })
}

/**
 * 批量添加广告投放时间
 * @param data
 */
export function batchAdschedules(data) {
  return request({
    url: '/api/v2/adschedules/batch',
    method: 'post',
    params: data
  })
}

/**
 * 批量删除广告投放时间
 * @param data
 */
export function deleteAdschedules(data) {
  return request({
    url: '/api/v2/adschedules/sync-bluk-delete',
    method: 'delete',
    params: data
  })
}

/**
 * 批量设置广告投放时间出价
 * @param data
 */
export function modifyBudgetAdschedules(data) {
  return request({
    url: '/api/v2/adschedules/sync-modify-bid',
    method: 'put',
    params: data
  })
}
