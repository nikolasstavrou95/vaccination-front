import axios from 'axios';



const API_URL = 'http://localhost:9984/api/v1/';


class StatisticsDataService {

    getMetadata(search) {
        return axios.get(API_URL + `metadata/?search=${search}`);
    }


}

export default new StatisticsDataService();