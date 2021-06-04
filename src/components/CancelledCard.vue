<template>
<div>
  <v-card
    class="mx-auto"
   
    
    height="100%"
  >
     <v-card-title class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
           Receive Appointments
            </h3>
     </v-card-title>
     <v-card-subtitle>
           <h6 class="subtitle-2 font-weight-light ml-1">from other hospitals</h6>
             </v-card-subtitle>
    <v-card-text >
    <v-container>
     <v-row class="justify-left">
       <v-list>
         <v-list-item>
          <v-list-item-avatar>
          <v-img
         
            alt=""
            src="https://img.icons8.com/officel/40/000000/cancel.png"
          ></v-img>
          </v-list-item-avatar>
           <v-list-item-content>
          <h5 class="font-weight-regular align-self-center ml-2">Cancellations: {{vaccinations}}</h5>
          </v-list-item-content>
        </v-list-item>
         <v-list-item >
        <v-list-item-avatar >
          <v-img
         
            alt=""
            src="/blue.png"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
         <h5 class="font-weight-regular align-self-center ml-2">{{ availability}} to Receive</h5>
        </v-list-item-content>
         </v-list-item>
         </v-list>
         </v-row>
        </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn
            color="primary"
            class="ml-2 mt-2 mb-2"
            small
            :loading="loading"
            outlined
            rounded
            @click="changeAvailability"
            >
         Change Availability
      </v-btn>
    </v-card-actions>
    
  </v-card>
 
</div>
</template>



<script>
import vaccinationsService from "@/services/vaccinationsService.js";

  export default {
    data () {
      return {
       loading:false,
       
      }
    },
  mounted() {
      this.getHospital(),
     this.$store.dispatch('loadVaccinations', this.$store.state.auth.hospital.username)
 
 },
    computed:{ 
     
      vaccinations(){
      return this.$store.state.vaccinations.vaccinationsCancelled
    },
    availability(){
    
      if (this.$store.state.hospital.hospitalData?.iamAvailable){
          return "Available"
      } else {
        return "Unavailable"
      
      }
     
    }
   

   
    },
    methods:{
      async changeAvailability(){
                   
         try{
           this.loading=true
           await vaccinationsService.makeAvailable(this.$store.state.auth.hospital.username)
           this.getHospital();
           this.loading=false
     
         }catch(error){
           console.log(error)
         }
    },
    async getHospital() {
      try{
       let response = await this.$store.dispatch(
        "loadHospital",
        this.$store.state.auth.hospital.username
      );

     
      if(response){
        throw new Error()}

      }catch(err){
       console.log(err)
       
      }
    },

  }
  }
</script>
