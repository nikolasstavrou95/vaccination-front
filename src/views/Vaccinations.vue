<template>
<v-container>
  <v-row justify="center" >
    <v-col cols='12'  >
       <v-card color="#61ba9f">
       <v-toolbar
       
      color="#61ba9f"
      dark
    shaped
    >
     <v-card
    
     left
     class="my-2 ml-2"
     flat
     color="#61ba9f">
      <NewVaccination/>
      </v-card>
      <v-spacer></v-spacer>
       <v-text-field
       class="mt-6 mb-2" 
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
     
     
   
      </v-toolbar>
     </v-card>
  <v-card class="mt-2">
       <v-data-table
      :headers="headers"
      :items="vaccinations"
      :search="search"
     >
       <template v-slot:top>
         <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="#2d8c92"
      ></v-progress-linear>
       </template>
    
 
     

       
    </v-data-table>
  </v-card>

  </v-col>
  </v-row>
</v-container>
 
  
  
</template>

<script>

import NewVaccination from '@/components/NewVaccination.vue';
import {mapState} from 'vuex';

  export default {
    components:{NewVaccination},
    
    data() {
      return {
        search: '',
       
      
       loading:false,
      
        headers: [
         
          { text: 'Hospital', value: 'hospital_id' },
          { text: 'Amka', value: 'patient_amka' },
          { text: 'Date', value: 'Date' },
          { text: 'Brand', value: 'vaccine_brand' },
         
        ],
      
      }
    },
    mounted () {
      this.initVaccinations()
    },
   computed:{
     ...mapState({vaccinations: state=>state.vaccinations.vaccinations})
   },
   methods: {
      async initVaccinations (){
        this.loading=true
         await this.$store.dispatch('loadVaccinations')
         this.loading=false
      }
    
   }
   }
  
</script>

<style  scoped>

</style>