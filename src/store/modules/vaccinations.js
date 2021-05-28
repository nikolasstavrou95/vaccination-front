
import vaccinationsService from "@/services/vaccinationsService.js";

export const state={
   
    vaccinations:[],
    vaccination:{}
 
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
          if (v.id==vaccination.id){v=vaccination}
        });
       
      }
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
   
    
    
    
    }
    
  