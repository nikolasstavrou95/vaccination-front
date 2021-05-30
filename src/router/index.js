import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
//import Vaccinations from '@/views/Vaccinations.vue'
//import Patients from '@/views/Patients.vue'
//import Statistics from '@/views/Statistics.vue'
import Dashboard from '@/views/Dashboard.vue'
//import Help from '@/views/Help.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home

    },
    {
      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/register',
      name: 'register',
      component: Register

    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
      redirect: '/user/dashboard',
      children: [

        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard

        },
        {

          path: 'patients',
          name: 'Patients',
          component: () => import(/* webpackChunkName: "about" */ '../views/Patients.vue'),
          meta: {
            title: 'Patients'
          }

        },
        {

          path: 'vaccinations',
          name: 'Vaccinations',
          component: () => import(/* webpackChunkName: "about" */ '../views/Vaccinations.vue'),
          meta: {
            title: 'Vaccinations'
          }

        },
        
        {

          path: 'statistics',
          name: 'Statistics',
          component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')

        },
        
        {

          path: 'profile',
          name: 'Hospital Profile',
          component: () => import(/* webpackChunkName: "about" */ '../views/HospitalProfile.vue')

        },



      ]

    }
  ]
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  //trying to access a restricted page + not logged in
  //redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});



