import HospitalDataService from "@/services/user.service.js";

export const state = {

    hospitalData: {},
    availableVaccines:""

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
    },
    SET_VACCINES(state,vaccines){
        state.availableVaccines  = vaccines
    }
    
    
}
export const getters={
    // availableVaccines(state){
    //     return state.hospitalData.vaccines.length ? state.hospitalData.vaccines.filter(vaccine=> vaccine.status==="AVAILABLE").length : 0;
    // },
    availableVaccinesByBrand(state){
        const availableVaccines = state.hospitalData.vaccines.length ? state.hospitalData.vaccines.filter(vaccine=> vaccine.status==="AVAILABLE") : []
        const collection = [];
        let temp = availableVaccines.reduce((r, a) => {
  
            r[a["brand"]] = [...r[a["brand"]] || [], a];
            return r;
           }, {});
           let objectArray = Object.entries(temp);
           objectArray.forEach(([key, value]) => {
            if(key!='undefined')  
             collection.push({label: key, totals:value.length})
             
         });
           
        return collection;

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
    
    async editHospital({ commit }, payload) {
        try {
            console.log(payload.username, payload.data)
            let response = await HospitalDataService.editHospitalData(payload.username,payload.data)
            commit('EDIT_HOSPITAL', response.data.data)
        } catch (error) {
            console.log("Couldn't load Hospital")
            return error;
        }
    },
    deleteHospital({commit}){
        commit('DELETE_HOSPITAL')
    },
     async loadVaccines({ commit }, username) {
        try {
            console.log(username)
            let response = await HospitalDataService.loadavailableVaccines(username)
            console.log(response)
            commit('SET_VACCINES', response.data)
        } catch (error) {
            console.log("Couldn't load Vaccines")
            return error;
        }
    },
    async addVaccines({ commit }, payload) {
        try {
          
            let response = await HospitalDataService.addVaccines({username:payload.username,quantity: payload.number,brand:payload.brand})
            commit('SET_VACCINES', response.data.data)
        } catch (error) {
            console.log("Couldn't load Vaccines")
            return error;
        }
    },



}

