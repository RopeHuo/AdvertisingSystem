import request from '@/utils/request'

/**
 * 获取关键字列表
 * @param query
 */
export function keywordList(query) {
  return request({
    url: '/api/campaign/keyword/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加关键字
 * @param data
 */
export function addKeyword(data) {
  return request({
    url: '/api/campaign/keyword/add',
    method: 'post',
    params: data
  })
}

/**
 * 修改关键字
 * @param data
 */
export function updateKeyword(keyword_id, data) {
  return request({
    url: '/api/campaign/keyword/edit/' + keyword_id,
    method: 'post',
    params: data
  })
}

/**
 * 批量操作
 * @param data
 */
export function operationKeyword(data) {
  return request({
    url: '/api/campaign/keyword/operation',
    method: 'post',
    params: data
  })
}
