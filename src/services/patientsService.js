import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';


// import http from "../http-common";
//class PatientsDataService {
  //  getAllPatients() {
        //return axios.get(API_URL + "findAllPatients", { headers: authHeader() })
  //  }
 //   addPatient(){
  //      return axios.get(API_URL + "addPatient", { headers: authHeader() })
  //  }
//}
//export default new PatientsDataService();
export default {
    getAllPatients() {
    return axios.get(API_URL + "findAllPatients", { headers: authHeader() })
    },
    addPatient(patient){
      const url = API_URL+"addPatient"
         return axios.post(url,patient,{ headers: authHeader() })
      },
      deletePatient(patientID){
        const url=API_URL+"deletePatient/"
        return axios.delete(url+patientID, { headers: authHeader() } )
      },
      editPatient(patientID,patient){
        const url = API_URL+"updatePatientById/"
           return axios.post(url+patientID,patient,{ headers: authHeader() })
        }
      


}