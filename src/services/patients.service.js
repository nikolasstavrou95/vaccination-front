import axios from "axios";
const API_URL = 'http://localhost:8080/';
import authHeader from './auth-header';

// import http from "../http-common";
class PatientsDataService {
    getAllPatients() {
        return axios.get(API_URL + "findAllPatients", { headers: authHeader() })
    }
}
export default new PatientsDataService();