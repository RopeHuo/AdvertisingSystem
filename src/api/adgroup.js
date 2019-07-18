import request from '@/utils/request'

/**
 * 获取广告组
 * @param query
 */
export function adGroupList(query) {
  return request({
    url: '/api/v2/adgroups',
    method: 'get',
    params: query
  })
}

/**
 * 添加广告组
 * @param data
 */
export function addAdGroup(data) {
  return request({
    url: '/api/v2/adgroups',
    method: 'post',
    params: data
  })
}

/**
 * 修改广告组
 * @param data
 */
export function updateAdGroup(adgroup_id, data) {
  return request({
    url: '/api/campaign/adgroup/edit/' + adgroup_id,
    method: 'post',
    params: data
  })
}
