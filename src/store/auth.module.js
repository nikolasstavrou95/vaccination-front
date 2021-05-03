import AuthService from '../services/auth.service';

const hospital = JSON.parse(localStorage.getItem('user'));
const initialState = hospital
    ? { status: { loggedIn: true }, hospital }
    : { status: { loggedIn: false }, hospital: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, hospital) {
            return AuthService.login(hospital).then(
                hospital => {
                    commit('loginSuccess', hospital);
                    return Promise.resolve(hospital);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, hospital) {
            return AuthService.register(hospital).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, hospital) {
            state.status.loggedIn = true;
            state.hospital = hospital;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.hospital = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.hospital = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};