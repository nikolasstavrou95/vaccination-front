import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(hospital) {
        return axios
            .post(API_URL + 'signin', {
                username: hospital.username,
                password: hospital.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(hospital) {
        return axios.post(API_URL + 'signup', {
            name: hospital.name,
            address: hospital.address,
            phone: hospital.phone,
            doses: hospital.doses,
            email: hospital.email,
            password: hospital.password
        });
    }
}

export default new AuthService();