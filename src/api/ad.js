import request from '@/utils/request'

/**
 * 获取广告列表
 * @param query
 */
export function adList(query) {
  return request({
    url: '/api/campaign/ad/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加广告组
 * @param data
 */
export function addAd(data) {
  return request({
    url: '/api/campaign/ad/add',
    method: 'post',
    params: data
  })
}

/**
 * 修改广告
 * @param data
 */
export function updateAdGroup(ad_id, data) {
  return request({
    url: '/api/campaign/ad/edit/' + ad_id,
    method: 'post',
    params: data
  })
}

// /**
//  * 修改广告
//  * @param data
//  */
// export function updateAdGroup(ad_id, data) {
//   return request({
//     url: '/api/campaign/ad/edit/' + ad_id,
//     method: 'post',
//     params: data
//   })
// }

