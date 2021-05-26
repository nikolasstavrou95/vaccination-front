import axios from "axios";
const API_URL = 'http://localhost:8080/patient/';
import authHeader from './auth-header';



export default {
  getAllPatients() {
    return axios.get(API_URL + "findAll", { headers: authHeader() })
  },
  addPatient(patient) {
    const url = API_URL + "addPatient"
    return axios.post(url, patient, { headers: authHeader() })
  },
  deletePatient(patientID) {
    const url = API_URL + "delete/"
    return axios.delete(url + patientID, { headers: authHeader() })
  },
  editPatient(patient) {
    const url = API_URL + "update"
    return axios.post(url, patient, { headers: authHeader() })
  }



}