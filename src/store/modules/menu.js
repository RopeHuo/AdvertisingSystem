import { getLeftMenu } from '@/api/menu'

const state = {
  menuType: 'campaign', // campaign 为广告系列 | adgroup 为广告组 | ad 为广告  | keyword 关键字
  campaignType: '',
  campaignStatus: 'ALL',
  adGroupStatus: 'ALL',
  campaignId: '',
  adGroupId: '',
  loadAdGroup: '',
  leftMenus: []
}

const mutations = {
  SET_CAMPAIGNTYPE: (state, campaignType) => {
    state.campaignType = campaignType
  },
  SET_CAMPAIGNSTATUS: (state, campaignStatus) => {
    state.campaignStatus = campaignStatus
  },
  SET_ADGROUPSTATUS: (state, adGroupStatus) => {
    state.adGroupStatus = adGroupStatus
  },
  SET_CAMPAIGNID: (state, campaignId) => {
    state.campaignId = campaignId
  },
  SET_ADGROUPID: (state, adGroupId) => {
    state.adGroupId = adGroupId
  },
  SET_MENUTYPE: (state, menuType) => {
    state.menuType = menuType
  },
  SET_LOADADGROUP: (state, loadAdGroup) => {
    state.loadAdGroup = loadAdGroup
  },
  SET_LEFTMENUS: (state, leftMenu) => {
    state.leftMenus = leftMenu
  }
}

const actions = {

  getLeftMenu({ commit }, userInfo) {
    return new Promise(resolve => {
      resolve()
    })
  },

  changeCampaignId({ commit }, data) {
    commit('SET_CAMPAIGNID', data)
  },

  changeCampaignType({ commit }, data) {
    commit('SET_CAMPAIGNTYPE', data)
  },

  changeCampaignStatus({ commit }, data) {
    commit('SET_CAMPAIGNSTATUS', data)
  },

  changeAdGroupStatus({ commit }, data) {
    commit('SET_ADGROUPSTATUS', data)
  },

  changeAdGroupId({ commit }, data) {

    commit('SET_ADGROUPID', data)
  },

  changeMenuType({ commit }, type) {
    commit('SET_MENUTYPE', type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
