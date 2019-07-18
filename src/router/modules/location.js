/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const locationRouter = {
  path: '/location',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Location',
  meta: {
    title: '所有关键字',
    icon: 'chart'
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/location/index'),
      name: 'LocationIndex1',
      meta: { title: '地理位置', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/location/index'),
      name: 'LocationIndex',
      meta: { title: '地理位置', noCache: true }
    }
  ]
}

export default locationRouter
