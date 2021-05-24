import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import * as patients from '@/store/modules/patients.js'
import * as hospital from '@/store/modules/hospital.js'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ['hospital']
})
export default new Vuex.Store({
  modules: {
    auth,
    patients,
    hospital
  },
  plugins: [dataState],
});
