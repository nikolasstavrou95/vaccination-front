import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import * as patients from '@/store/modules/patients.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    patients
  }
});
