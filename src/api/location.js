import request from '@/utils/request'

/**
 * 获取地理位置列表
 * @param query
 */
export function locationList(query) {
  return request({
    url: '/api/v2/locations',
    method: 'get',
    params: query
  })
}

/**
 * 批量添加地理位置
 * @param data
 */
export function addLocation(data) {
  return request({
    url: '/api/v2/locations/batch',
    method: 'post',
    params: data
  })
}


/**
 * 批量删除地理位置
 * @param data
 */
export function deleteLocation(data) {
  return request({
    url: '/api/v2/locations/sync-bluk-delete',
    method: 'delete',
    params: data
  })
}

/**
 * 批量设置地理位置出价
 * @param data
 */
export function modifyLocation(data) {
  return request({
    url: '/api/v2/locations/sync-modify-bid',
    method: 'put',
    params: data
  })
}
