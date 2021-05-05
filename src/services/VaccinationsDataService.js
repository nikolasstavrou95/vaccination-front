import http from "../http-common";

class VaccinationsDataService {

  getAllVaccinations() {
    return http.get("/vaccinations");
  }

  getVaccination(id) {
    return http.get(`/vaccinations/${id}`);
  }

  createVaccination(data) {
    return http.post("/vaccinations", data);
  }

  updateVaccination(id, data) {
    console.log("Hi" + id);
    return http.put(`/vaccinations/${id}`, data);
  }

  deleteVaccination(id) {
    return http.delete(`/vaccinations/${id}`);
  }

  deleteAllVac() {
    return http.delete(`/vaccinations`);
  }

  findByTitle(title) {
    return http.get(`/vaccinations?title=${title}`);
  }
}

export default new VaccinationsDataService();
