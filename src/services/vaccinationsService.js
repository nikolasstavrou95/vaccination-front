import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';


export default {
    getAllVaccinations() {
    return axios.get(API_URL + "findAllVaccinations", { headers: authHeader() })
    },
    addVaccination(username,vaccination){
      const url = API_URL+username+"/vaccination/"
         return axios.post(url,vaccination,{ headers: authHeader() })
      }
     
      


}