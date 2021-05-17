import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Navbar from '@/components/Navbar.vue'
import Patients from '@/views/Patients.vue'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faLock,
  faUserEdit
} from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faLock, faUserEdit);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('Navbar', Navbar)
Vue.component('Patients', Patients)

Vue.config.productionTip = false
//Vue.use(Chart);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
