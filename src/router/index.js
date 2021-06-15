import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

import LoginView from '@/views/LoginView'
import Home from '@/views/Home.vue'
import QuotesView from '@/views/QuotesView'
import InvoicesView from '@/views/InvoicesView'
import ClientsView from '@/views/ClientsView'
import DocumentView from '@/views/DocumentView'
import InventoryManager from '@/views/InventoryManager'

import firebase from 'firebase/app'
import 'firebase/firebase-auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginView,
            },
        ],
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/quotes',
                name: 'QuotesView',
                component: QuotesView,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/document/:documentId/:documentType',
                name: 'DocumentView',
                component: DocumentView,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/invoices',
                name: 'InvoicesView',
                component: InvoicesView,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/clients',
                name: 'ClientsView',
                component: ClientsView,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/inventory',
                name: 'InventoryManager',
                component: InventoryManager,
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) next()
            else next('/login')
        })
    } else {
        next()
    }
})

export default router
