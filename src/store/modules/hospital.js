import HospitalDataService from "@/services/user.service.js";

export const state = {

    hospitalData: {}

}
export const mutations = {
    SET_HOSPITAL(state, hospital) {
        state.hospitalData = hospital
    },
}

export const actions = {
    async loadHospitalData({ commit }, username) {
        try {
            let response = await HospitalDataService.getHospitalData(username)
            commit('SET_HOSPITAL', response.data)
        } catch (error) {
            console.log("Couldn't load Hospital")
        }
    }



}
