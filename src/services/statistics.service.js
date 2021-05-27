import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/';


class StatisticsDataService {

    getMetadata(username) {
        return axios.get(API_URL + `${username}/vaccination/allHospitals`, { headers: authHeader() });
    }


}

export default new StatisticsDataService();