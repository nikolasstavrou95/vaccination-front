
import vaccinationsService from "@/services/vaccinationsService.js";

export const state={
   
    vaccinations:[],
    vaccination:{},
    patientVaccinesList:[]
 
  }
export const  mutations= {
      SET_VACCINATIONS(state,vaccinations)
      {
        state.vaccinations=vaccinations
       },
     
      ADD_VACCINATION(state, vaccination) {
        let vaccinations=state.vaccinations.concat(vaccination)
        state.vaccinations=vaccinations 
      },
      
      EDIT_VACCINATION(state, vaccination) {
        state.vaccinations.forEach(v => {
          if (v.transid==vaccination.transid){v=vaccination.v}
        });
       
      },
      SET_VACCINES(state,vaccine)
      {
        state.patientVaccinesList = vaccine;
       },
  }
    
   export const actions={
      async loadVaccinations({commit},username)
      { try{
       let response=await vaccinationsService.getAllVaccinations(username)
          commit('SET_VACCINATIONS', response.data)
        }catch(error){
          console.log("Couldn't load vaccinations")
        }
          
     }  ,
    async addVaccination({commit},payload)
     { try{
       console.log(payload.username,payload.vaccination)
        let response = await vaccinationsService.addVaccination(payload.username, payload.vaccination)
    
        commit('ADD_VACCINATION', response.data.data)
        
     } catch(error){
       console.log("something went wrong here store",error)
     }
    },
    async editVaccination({commit},payload)
     { try{
       console.log(payload.username,payload.vaccination)
        await vaccinationsService.editVaccination(payload.username,payload.transid, payload.vaccination)
    
        commit('EDIT_VACCINATION', {transid: payload, v: payload.vaccination})
        
     } catch(error){
       console.log("something went wrong here store",error)
       return error;
     }
    },
    async transferVaccination({commit},payload)
     { try{
       console.log(payload.username,payload.vaccination)
        let response = await vaccinationsService.addVaccination(payload.username,payload.transid,payload.vaccination)
    
        commit('ADD_VACCINATION', response.data.data)
        
     } catch(error){
       console.log("something went wrong here store",error)
       return error;
     }
    },
    async getVaccineList({commit},payload)
    { 
      try{
      console.log(payload.username,payload.patientid)
       let response = await vaccinationsService.getPatientVaccineList(payload.username,payload.patientid)
       let list =[] 
       response.data.forEach(element => {
         element ? list.push(element) : []
         
       });
      
       commit('SET_VACCINES', list)
       
    } catch(error){
      console.log("something went wrong here store",error)
      return error;
    }
   },
    
   
    
    
    
    }
    
  