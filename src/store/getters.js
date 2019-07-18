const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  campaignType: state => state.menu.campaignType,
  campaignStatus: state => state.menu.campaignStatus,
  adGroupStatus: state => state.menu.adGroupStatus,
  adGroupId: state => state.menu.adGroupId,
  campaignId: state => state.menu.campaignId,
  menuType: state => state.menu.menuType
}

export default getters
