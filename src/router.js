import { createWebHistory, createRouter } from 'vue-router'
import Catalog from '@/views/catalog/Catalog.vue'
import CatalogDetail from '@/views/catalog/_id.vue'
import Converter from '@/views/Converter.vue'

const routes = [
  // catalog
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
  },
  {
    path: '/catalog/:id',
    name: 'CatalogDetail',
    component: CatalogDetail,
  },

  // converter
  {
    path: '/converter',
    name: 'Converter',
    component: Converter,
  },
]

const router = createRouter({
  history: createWebHistory('/usd-vue3/'), // or createWebHistory(process.env.BASE_URL)
  routes,
})

export default router
