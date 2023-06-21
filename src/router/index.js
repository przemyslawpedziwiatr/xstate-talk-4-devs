import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pipe-oil-flow',
      name: 'pipe-oil-flow',
      component: () => import('../views/1-BarrelPipeOilFlowView.vue')
    },
    {
      path: '/barrel-placement',
      name: 'pipe-placement',
      component: () => import('../views/2-BarrelPlacementView.vue')
    },
    {
      path: '/fill-up-labeling',
      name: 'fill-up-labeling',
      component: () => import('../views/3-BarrelFillUpLabelingView.vue')
    },
    {
      path: '/multiple-flows',
      name: 'multiple-flows',
      component: () => import('../views/4-MultipleFlowView.vue')
    }
  ]
})

export default router
