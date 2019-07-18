/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const adgroupRouter = {
  path: '/adgroup',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Adgroup',
  meta: {
    title: '所有广告组',
    icon: 'chart'
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/adgroups/index'),
      name: '',
      meta: { title: '广告组', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/adgroups/index'),
      name: 'AdgroupIndex',
      meta: { title: '广告组', noCache: true }
    }
  ]
}

export default adgroupRouter
