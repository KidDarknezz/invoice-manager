import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuotesView from '@/views/QuotesView'
import InvoicesView from '@/views/InvoicesView'
import ClientsView from '@/views/ClientsView'
import DocumentView from '@/views/DocumentView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/document',
    name: 'DocumentView',
    component: DocumentView
  },
  {
    path: '/quotes',
    name: 'QuotesView',
    component: QuotesView
  },
  {
    path: '/invoices',
    name: 'InvoicesView',
    component: InvoicesView
  },
  {
    path: '/clients',
    name: 'ClientsView',
    component: ClientsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
