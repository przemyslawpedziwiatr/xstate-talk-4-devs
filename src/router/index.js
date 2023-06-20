import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pipe-oil-flow',
      name: 'pipe-oil-flow',
      component: () => import('../views/BarrelPipeOilFlowView.vue')
    },
    {
      path: '/barrel-placement',
      name: 'pipe-placement',
      component: () => import('../views/BarrelPlacementView.vue')
    },
    {
      path: '/fill-up-labeling',
      name: 'fill-up-labeling',
      component: () => import('../views/BarrelFillUpLabelingView.vue')
    },
    {
      path: '/multiple-flows',
      name: 'multiple-flows',
      component: () => import('../views/MultipleFlowView.vue')
    }
  ]
})

export default router
