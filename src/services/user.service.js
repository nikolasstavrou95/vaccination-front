import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/';


class HospitalDataService {



    getHospitalData(username) {
        return axios.get(API_URL + `getHospitalAttributesById/${username}`, { headers: authHeader() });
    }



}

export default new HospitalDataService();