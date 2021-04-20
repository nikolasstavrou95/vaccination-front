import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '@/views/Home.vue'
//import Vaccinations from '@/views/Vaccinations.vue'
//import Patients from '@/views/Patients.vue'
//import Statistics from '@/views/Statistics.vue'
//import Help from '@/views/Help.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    
  }, 
  {
    path: '/patients',
    name: 'Patients',
    component: () => import(/* webpackChunkName: "about" */ '../views/Patients.vue')
  
  },
  {
    path: '/vaccinations',
    name: 'Vaccinations',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vaccinations.vue')
  
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')
  
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue')
  
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  
  },
  
]

const router = new VueRouter({
  routes
})

export default router
