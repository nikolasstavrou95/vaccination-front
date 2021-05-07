import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
//import Vaccinations from '@/views/Vaccinations.vue'
//import Patients from '@/views/Patients.vue'
//import Statistics from '@/views/Statistics.vue'
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
      path: '/home',
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

      children: [
        {

          path: 'patients',
          component: () => import(/* webpackChunkName: "about" */ '../views/Patients.vue'),
          meta: {
            title: 'Patients'
          }

        },
        {

          path: 'vaccinations',
          component: () => import(/* webpackChunkName: "about" */ '../views/Vaccinations.vue'),
          meta: {
            title: 'Vaccinations'
          }

        },
        {

          path: 'vaccines',
          component: () => import(/* webpackChunkName: "about" */ '../views/Vaccines.vue'),
          meta: {
            title: 'Vaccines'
          }

        },
        {

          path: 'statistics',
          component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')

        },
        {

          path: 'help',
          component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue')

        },
        {

          path: 'profile',
          component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')

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



