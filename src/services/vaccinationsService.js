import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';



export default {
    getAllVaccinations(username) {
    return axios.get(API_URL + `${username}/vaccination/all`, { headers: authHeader() })
    },
    addVaccination(username,vaccination){
     
         return axios.post(API_URL+ `${username}/vaccination/`, vaccination , { headers: authHeader() })
      }
     
   


}