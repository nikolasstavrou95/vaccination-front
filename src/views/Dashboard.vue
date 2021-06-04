<template>
  <v-container>
    <v-row class="mt-8 justify-center" >
      <v-col cols="12" md="4" >
        <AvailableVaccines/>
      </v-col>
      <v-col cols="12" md="4">
     <CancelledCard/>
        
      </v-col>
      <v-col cols="12" md="4" >
        <Transferable/>
      </v-col>
    </v-row>
   
    <v-row class="mt-8 justify-center">
      <v-col cols="12">
     <stepper class="mt-4"> </stepper>
      </v-col>
    </v-row>
   
   
        
               
        
       


  </v-container>
</template>

<script>


import Stepper from '@/components/Stepper.vue';
import CancelledCard from '@/components/CancelledCard.vue';
import Transferable from '@/components/Transferable.vue';
import AvailableVaccines from '@/components/AvailableVaccines.vue';
export default {
  name: "Dashboard",
components: {

 Stepper,
 CancelledCard,
 Transferable,
AvailableVaccines
},

mounted(){
this.initVaccinations();
},

methods:{
async initVaccinations (){
        try{
        this.loadingTable=true
         let response = await this.$store.dispatch('loadVaccinations',this.$store.state.auth.hospital.username)
         if(response) throw new Error(response)
        
        
         this.loadingTable=false
        } catch(error){
           this.color2="#e17b58";
           this.message=`Couldn't load vaccination. ${error}`
           this.snackbar2 = true;
           
           this.loadingTable=false
       
        }
      }
} 
}  
</script>


