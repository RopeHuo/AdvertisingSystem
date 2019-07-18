/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const adRouter = {
  path: '/ad',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Ad',
  meta: {
    title: '所有广告',
    icon: 'chart'
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/ad/index'),
      name: '',
      meta: { title: '广告', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/ad/index'),
      name: 'AdIndex',
      meta: { title: '广告', noCache: true }
    }
  ]
}

export default adRouter
