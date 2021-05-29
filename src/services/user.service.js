import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/';


class HospitalDataService {



    getHospitalData(username) {
        return axios.get(API_URL + `${username}/getHospital`, { headers: authHeader() });
    }

    editHospitalData(username , data){
        return axios.post(API_URL + `${username}/updateUser`, data, { headers: authHeader() }); 

    }
    addVaccines(data){
        console.log(authHeader())
        return axios.post(API_URL + `${data.username}/vaccine/add/${data.brand}/${data.quantity}/`, [], { headers: authHeader() });
    }
    loadavailableVaccines(username){
        return axios.get(API_URL + `${username}/vaccine/countAvailable`, { headers: authHeader() });
    }



}

export default new HospitalDataService();