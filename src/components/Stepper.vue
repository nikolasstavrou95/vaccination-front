<template>
<v-container>
  <v-stepper   v-model="e1">
    <v-stepper-header>
      <v-stepper-step
       
        step="1"
        
      >
        Add Patient
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        
        step="2"
        
      >
       Create / Update Appointment
      </v-stepper-step>

      <v-divider></v-divider>

      
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
      
        <patients/>

        <v-btn
        class="mr-2"
         rounded
        outlined
          color="#61ba9f"
          @click="e1=2"
        >
          Continue
        </v-btn>

       
      </v-stepper-content>

      <v-stepper-content step="2">
      
        <vaccinations/>

        <v-btn
         class="mr-2"
         rounded
        outlined
          color="#61ba9f"
          @click="e1=1"
        >
         Back
        </v-btn>

       
      </v-stepper-content>

     
    </v-stepper-items>
  </v-stepper>
</v-container>
</template>

  <script>


import Patients from '../views/Patients.vue';
import Vaccinations from '../views/Vaccinations.vue';

export default {
  components: { Patients, Vaccinations },

  data() {
    return {
      e1: 1
 
     
    }
  },
  
  
     
       
   }

 
  
</script>
