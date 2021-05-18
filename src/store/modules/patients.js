
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
  async loadPatients({ commit }) {
    try {
      let response = await patientsService.getAllPatients()
      commit('SET_PATIENTS', response.data)
    } catch (error) {
      console.log("Couldn't load patients")
    }

  },
  async addPatient({ commit }, patient) {
    try {
      let response = await patientsService.addPatient(patient)

      commit('ADD_PATIENT', response.data.data)

    } catch (error) {
      console.log("something went wrong here store", error)
    }
  },
  async deletePatient({ commit }, patient) {
    try {
      let response = await patientsService.deletePatient(patient)
      if (response.status == 200 || response.status == 204) {
        commit('DELETE_PATIENT', patient.id)
      }
    } catch (error) {
      console.log("something went wrong here store", error)
    }
  },
  async editPatient({ commit }, patient) {
    try {
      let response = await patientsService.editPatient(patient)
      let editedPatient = response.data.data
      commit('EDIT_PATIENT', editedPatient)

    } catch (error) {
      console.log("something went wrong here store", error)
    }
  }

}

