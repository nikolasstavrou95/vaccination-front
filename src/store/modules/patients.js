import patientsService from "@/services/patientsService.js";

export const state = {

  patients: [],
  patient: {}

}
export const mutations = {
  SET_PATIENTS(state, patients) {
    state.patients = patients
  },

  ADD_PATIENT(state, patient) {
    let patients = state.patients.concat(patient)
    state.patients = patients
  },
  DELETE_PATIENT(state, patientID) {
    let patients = state.patients.filter(p => p.id != patientID)
    state.patients = patients
  },
  EDIT_PATIENT(state, patient) {
    state.patients.forEach(p => {
      if (p.id == patient.id) { p = patient }
    });

  }
}

export const actions = {
  async loadPatients({ commit },username) {
    try {
      let response = await patientsService.getAllPatients(username)
      commit('SET_PATIENTS', response.data)
    } catch (error) {
      console.log("Couldn't load patients")
    }

  },
  async addPatient({ commit }, payload) {
    try {
      let response = await patientsService.addPatient(payload.username,payload.patient)

      commit('ADD_PATIENT', response.data.data)

    } catch (error) {
      console.log("something went wrong here store", error)
    }
  },
  async deletePatient({ commit }, payload) {
    try {
      let response = await patientsService.deletePatient(payload.username, payload.patient)
      if (response.status == 200 || response.status == 204) {
        commit('DELETE_PATIENT', payload.patient.id)
      }
    } catch (error) {
      console.log("something went wrong here store", error)
    }
  },
  async editPatient({ commit }, payload) {
    try {
      let response = await patientsService.editPatient(payload.username,payload.patient)
      let editedPatient = response.data.data
      commit('EDIT_PATIENT', editedPatient)

    } catch (error) {
      console.log("something went wrong here store", error)
    }
  }

}