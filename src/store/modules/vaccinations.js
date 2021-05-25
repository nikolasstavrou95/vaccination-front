
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
      async loadVaccinations({commit})
      { try{
       let response=await vaccinationsService.getAllVaccinations()
          commit('SET_VACCINATIONS', response.data)
        }catch(error){
          console.log("Couldn't load vaccinations")
        }
          
     }  ,
    async addVaccination({commit},username,vaccination)
     { try{
        let response= await vaccinationsService.addVaccination(username,vaccination)
    
        commit('ADD_VACCINATION', response.data.data)
        
     } catch(error){
       console.log("something went wrong here store",error)
     }
    },
   
    
    
    
    }
    
  