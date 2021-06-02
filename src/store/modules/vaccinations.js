
import vaccinationsService from "@/services/vaccinationsService.js";

export const state={
   
    vaccinations:[],
    vaccination:{},
    vaccinationsCancelled:"",
    vaccinationsNeedTransfer:""

   
 
  }
export const  mutations= {
      SET_VACCINATIONS(state,vaccinations)
      {
        state.vaccinations=vaccinations
        state.vaccinationsCancelled= state.vaccinations.filter((el=> el.status==="CANCELLED")).length
        state.vaccinationsNeedTransfer = state.vaccinations.filter((el)=> !el.transferable).length

       },
     
      ADD_VACCINATION(state, vaccination) {
       
        state.vaccinations.push(vaccination)
      },
      
      EDIT_VACCINATION(state, vaccination) {
        state.vaccinations.forEach(v => {
          if (v.transid==vaccination.transid){v=vaccination.v}
        });
       
      },
      DELETE_VACCINATION(state, transid) {
        for(var i=0; i<state.vaccinations.length; i++){
          if(state.vaccinations[i].transid===transid){
            state.vaccinations.splice(i,1);
          }

        }
       
      },
      
  }
    
   export const actions={
      async loadVaccinations({commit},username)
      { try{
       let response = await vaccinationsService.getAllVaccinations(username)
       
       if(response.status==='500') throw new Error("Server not responding")
       if(response.status==='400') throw new Error("Something is wrong with your data, try again!")
       let merged =[];
       
      response.data.forEach(element => {
       merged.push({...element[0] ,...element[1],transid: element[2],transferable: element[3]}
         )
        
      });
      console.log(merged)
      commit('SET_VACCINATIONS', merged)
        }catch(error){
          console.log(`Couldn't load vaccinations ${error}`)
          return error;
        }
          
     }  ,
    async addVaccination({commit},payload)
     { try{
       console.log(payload.username,payload.vaccination)
        let response = await vaccinationsService.addVaccination(payload.username, payload.vaccination)
       
        if(response.status==='500') throw new Error("Server not responding")
        if(response.status==='400') throw new Error("Something is wrong with your data, try again!")
       
        commit('ADD_VACCINATION', payload.vaccination)
        
     } catch(error){
       console.log("something went wrong here store",error)
       return error
     }
    },
    async editVaccination({commit},payload)
     { 
       try{
       console.log(payload.username,payload.vaccination)
        let response = await vaccinationsService.editVaccination(payload.username,payload.transid, payload.vaccination)
       
        if(response.status==='500') throw new Error("Server not responding")
        if(response.status==='400') throw new Error("Something is wrong with your data, try again!")
        commit('EDIT_VACCINATION', {transid: payload, v: payload.vaccination})
        
     } catch(error){
       console.log("something went wrong here store",error)
       return error;
     }
    },
    async transferVaccination({commit},payload)
     { try{
       console.log(payload.username,payload.vaccination)
        let response = await vaccinationsService.transferVaccination(payload.username,payload.transid,payload.vaccination)
        if(response.status==='500') throw new Error("Server not responding")
        if(response.status==='400') throw new Error("Something is wrong with your data, try again!")
        commit('DELETE_VACCINATION', payload.transid)
        
     } catch(error){
       console.log("something went wrong here store",error)
       return error;
     }
    },
   
    
   
    
    
    
    }
    
  