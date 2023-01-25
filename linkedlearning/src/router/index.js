import { createRouter, createWebHistory } from 'vue-router'
import signup from '../views/auth/signup.vue'
import login from '../views/auth/login.vue'
import store from '../store/mainIndex'
import verify from '../views/auth/verify.vue'
import dashboard from '../views/main_page/dashboard.vue'

const routes = [
  {
    path : '/signup',
    name : 'signup',
    component : signup
  },
  {
    path : '/login',
    name : 'login',
    component : login
  },
  {
    path: '/signup/verify',
    name : 'verify',
    component : verify
  },
  {
    path : '/dashboard',
    name : 'dashboard',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : dashboard
  },
  // {
  //   path: '/stockInfo',
  //   name : 'stockInfo',
  //   beforeEnter: (to, from, next) => {
  //     if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
  //     else next()
  //   },
  //   component : stockInfo
  // },
  // {
  //   path : '/holdings',
  //   name : 'holdings',
  //   beforeEnter: (to, from, next) => {
  //     if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
  //     else next()
  //   }, 
  //   component : holdings
  // },
  // {
  //   path : '/dashboard/sell',
  //   name : 'selling',
  //   beforeEnter: (to, from, next) => {
  //     if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
  //     else next()
  //   },
  //   component : selling
  // },
  // {
  //   path : '/account',
  //   name : 'account',
  //   beforeEnter: (to, from, next) => {
  //     if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
  //     else next()
  //   },
  //   component : account
  // },
  // {
  //   path: '/transaction',
  //   name : 'transaction',
  //   beforeEnter: (to, from, next) => {
  //     if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
  //     else next()
  //   },
  //   component : transaction
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
