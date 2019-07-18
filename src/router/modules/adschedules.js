/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const adschedulesRouter = {
  path: '/adschedules',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Adschedules',
  meta: {
    title: '投放时间',
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/adschedules/index'),
      name: '',
      meta: { title: '投放时间', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/adschedules/index'),
      name: 'AdschedulesIndex',
      meta: { title: '投放时间', noCache: true }
    }
  ]
}

export default adschedulesRouter
