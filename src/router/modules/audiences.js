/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const audiencesRouter = {
  path: '/audiences',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Audiences',
  meta: {
    title: '受众群体',
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/audiences/index'),
      name: '',
      meta: { title: '受众群体', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/audiences/index'),
      name: 'AudiencesIndex',
      meta: { title: '受众群体', noCache: true }
    }
  ]
}

export default audiencesRouter
