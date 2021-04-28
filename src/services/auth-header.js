export default function authHeader() {
    let hospital = JSON.parse(localStorage.getItem('hospital'));

    if (hospital && hospital.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': hospital.accessToken };
    } else {
        return {};
    }
}