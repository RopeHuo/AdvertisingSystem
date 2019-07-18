import request from '@/utils/request'

/**
 * 广告系列列表
 * @param query
 */
export function campaignsList(query) {
  return request({
    url: '/api/v2/campaigns',
    method: 'get',
    params: query
  })
}

/**
 * 广告系列报表
 * @param query
 */
export function campaignsReport(query) {
  return request({
    url: '/api/v2/reports/chart',
    method: 'get',
    params: query
  })
}


/**
 * 添加广告系列详情
 * @param data
 */
export function addCampaigns(data) {
  return request({
    url: '/api/v2/campaigns',
    method: 'post',
    params: data
  })
}

/**
 * 查看广告系列详情
 * @param campaignId
 */
export function getCampaign(campaignId) {
  return request({
    url: '/api/v2/campaigns/' + campaignId,
    method: 'get'
  })
}

/**
 * 修改广告系列基础信息（状态，预算等）
 * @param campaignId
 */
export function campaignsEdit(campaignId) {
  return request({
    url: '/api/campaign/edit/' + campaignId,
    method: 'post',
    params: campaignId
  })
}



