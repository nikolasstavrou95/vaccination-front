import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import * as patients from '@/store/modules/patients.js'
import * as hospital from '@/store/modules/hospital.js'
import * as vaccinations from '@/store/modules/vaccinations.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    patients,
    hospital,
    vaccinations
  }
});
