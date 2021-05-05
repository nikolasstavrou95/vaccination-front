import http from "../http-common";

class VaccinesDataService {

  getAllVaccines(){
    console.log("Hi!");
    return http.get("/vaccines");
  }
  
  getVaccine(id) {
    return http.get(`/vaccines/${id}`);
  }
  
  createVaccine(data) {
    return http.post("/vaccines", data);
  }
  
  updateVaccine(id, data) {
    return http.put(`/vaccines/${id}`, data);
  }
  
}

export default new VaccinesDataService();
