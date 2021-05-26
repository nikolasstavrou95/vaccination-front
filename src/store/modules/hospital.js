import HospitalDataService from "@/services/user.service.js";

export const state = {

    hospitalData: {}

}
export const mutations = {
    SET_HOSPITAL(state, hospital) {
        state.hospitalData = hospital
    },
    EDIT_HOSPITAL(state,hospital){
        state.hospitalData = hospital
    },
    DELETE_HOSPITAL(state){
        state.hospitalData = null;
    }
    
}
export const getters={
    availableVaccines(state){
        return state.hospitalData.vaccines.length ? state.hospitalData.vaccines.filter(vaccine=> vaccine.status==="AVAILABLE").length : 0;
    }
}

export const actions = {
    async loadHospital({ commit }, username) {
        try {
            let response = await HospitalDataService.getHospitalData(username)
            commit('SET_HOSPITAL', response.data)
        } catch (error) {
            console.log("Couldn't load Hospital")
            return error;
        }
    },
    
    async editHospital({ commit }, hospital,data) {
        try {
            let response = await HospitalDataService.editHospitalData(hospital,data)
            commit('EDIT_HOSPITAL', response.data.data)
        } catch (error) {
            console.log("Couldn't load Hospital")
            return error;
        }
    },
    deleteHospital({commit}){
        commit('DELETE_HOSPITAL')
    }
   



}
