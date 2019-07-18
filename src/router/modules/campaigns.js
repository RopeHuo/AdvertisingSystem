/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const campaignsRouter = {
  path: '/campaigns',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Campaigns',
  meta: {
    title: '所有广告系列',
    icon: 'chart'
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/campaigns/index'),
      name: '',
      meta: { title: '搜索广告系列', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/campaigns/index'),
      name: 'CampaignsIndex',
      meta: { title: '广告系列', noCache: true }
    },
    {
      path: 'add',
      component: () => import('@/views/campaigns/add'),
      name: 'CampaignsAdd',
      meta: { title: '新广告系列', noCache: true }
    }
  ]
}

export default campaignsRouter
