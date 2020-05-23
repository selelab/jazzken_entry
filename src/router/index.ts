import Vue from 'vue'
import VueRouter from 'vue-router'
import EntryForm from '@/pages/EntryForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EntryForm',
    component: EntryForm,
  },
  {
    path: '/confirm',
    name: 'EntryConfirm',
    component: () => import('@/pages/EntryConfirm.vue'),
  },
  {
    path: '/complete',
    name: 'EntryComplete',
    component: () => import('@/pages/EntryComplete.vue'),
  },
  {
    path: '/list',
    name: 'BandList',
    component: () => import('@/pages/BandList.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
