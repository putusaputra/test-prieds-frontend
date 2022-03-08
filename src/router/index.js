import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeViewCopy from '../views/HomeViewCopy.vue'
import SaveVisitorView from '../views/SaveVisitorView.vue'
import ListVisitorView from '../views/ListVisitorView.vue'
import PrintQueueView from '../views/PrintQueueView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      name: 'home',
      component: HomeViewCopy
    },
    {
      path: '/save-visitor',
      name: 'save-visitor',
      component: SaveVisitorView
    },
    {
      path: '/list-visitor',
      name: 'list-visitor',
      component: ListVisitorView
    },
    {
      path: '/print-queue/:visitorId',
      name: 'print-queue',
      component: PrintQueueView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
