import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';



export default {
    getAllVaccinations(username) {
    return axios.get(API_URL + `${username}/vaccination/all`, { headers: authHeader() })
    },
    addVaccination(username,vaccination){
     
         return axios.post(API_URL+ `${username}/vaccination/`, vaccination , { headers: authHeader() })
    },
    editVaccination(username,transid,vaccination){
        return axios.post(API_URL+ `${username}/vaccination/update/${transid}`, vaccination, { headers:authHeader() })
    },
    transferVaccination(username,transid,vaccination){
        return axios.post(API_URL+ `${username}/vaccination/transfer/${transid}`, vaccination, {headers:authHeader()})
    },
    getPatientVaccineList(username,patientID){
        const url = API_URL + `${username}/vaccine/findBrands/${patientID}`;
        return axios.get(url, { headers: authHeader() });
      },

    makeAvailable(username){
        return axios.post(API_URL + `${username}/makeMeAvailable`, [] , {headers:authHeader()})
    }
   


}