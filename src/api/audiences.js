import request from '@/utils/request'

/**
 * 获取受众群体列表
 * @param query
 */
export function audiencesList(query) {
  return request({
    url: '/api/v2/audiences',
    method: 'get',
    params: query
  })
}

/**
 * 批量添加受众群体
 * @param data
 */
export function batchAudiences(data) {
  return request({
    url: '/api/v2/audiences/batch',
    method: 'post',
    params: data
  })
}

/**
 * 批量删除受众群体
 * @param data
 */
export function deleteAudiences(data) {
  return request({
    url: '/api/v2/audiences/sync-bluk-delete',
    method: 'delete',
    params: data
  })
}

/**
 * 批量设置受众群体出价
 * @param data
 */
export function modifyBudgetAudiences(data) {
  return request({
    url: '/api/v2/audiences/sync-modify-bid',
    method: 'put',
    params: data
  })
}
