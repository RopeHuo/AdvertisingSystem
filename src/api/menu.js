import request from '@/utils/request'

export function getLeftMenu(data) {
  return request({
    url: '/api/v2/campaigns/tree',
    method: 'get',
    params: data
  })
}
