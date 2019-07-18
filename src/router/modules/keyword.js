/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const keywordRouter = {
  path: '/keyword',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Keyword',
  meta: {
    title: '所有关键字',
    icon: 'chart'
  },
  children: [
    {
      path: '/',
      component: () => import('@/views/keyword/index'),
      name: '',
      meta: { title: '关键字', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/keyword/index'),
      name: 'KeywordIndex',
      meta: { title: '关键字', noCache: true }
    }
  ]
}

export default keywordRouter
