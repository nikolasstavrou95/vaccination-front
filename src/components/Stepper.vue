<template>
<v-container>
  <v-stepper  non-linear class="mt-12" v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        complete
        editable
       
        
        step="1"
        edit-icon="mdi-account-multiple-plus-outline"
        
      >
        Add Patient
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        complete
        edit-icon="mdi-calendar-plus"
        step="2"
        
        
      >
       Create / Update Appointment
      </v-stepper-step>

     
      
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
      
        <patients/>

       
       
      </v-stepper-content>

      <v-stepper-content step="2">
      
        <vaccinations/>

  
       
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
