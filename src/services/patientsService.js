import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';



export default {
  getAllPatients(username) {
    return axios.get(API_URL + `${username}/patient/findAll`, { headers: authHeader() })
  },
  addPatient(username,patient) {
    const url = API_URL + `${username}/patient/addPatient`
    return axios.post(url, patient, { headers: authHeader() })
  },
  deletePatient(username,patientID) {
    const url = API_URL + `${username}/patient/delete/`
    return axios.delete(url + patientID, { headers: authHeader() })
  },
  editPatient(username,patient) {
    const url = API_URL + `${username}/patient/update`
    return axios.post(url, patient, { headers: authHeader() })
  }



}