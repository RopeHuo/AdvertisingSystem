import request from '@/utils/request'

/**
 * 获取地理位置
 * @param data
 */
export function getCriteria(data) {
  return request({
    url: '/api/campaign/criteria/list',
    method: 'get',
    params: data
  })
}

/**
 * 受众特征 获取受众群体，特征(性别，生育，年龄范围，收入范围)等标准信息
 * @param data
 */
export function getCharacteristic(type) {
  return request({
    url: '/api/v2/google-criterions/tree/{type}',
    method: 'get'
  })
}

//

/**
 * 受众特征 获取受众群体，特征(性别，生育，年龄范围，收入范围)等标准信息
 * @param data
 */
export function getCharacteristicArray(data) {
  return request({
    url: '/api/v2/google-criterions/trees',
    method: 'get',
    params: data
  })
}
