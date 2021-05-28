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
       <template v-slot:item.actions="{ item }">
              <v-btn
                small
                rounded
                outlined
                fab
                
                class="mr-2"
                color="#03A9F4"
                @click="showEditVaccination(item)"
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                small
                rounded
                outlined
                fab
                class="mr-2"
                color="#e17b58"
                @click="showTransVaccination(item)"
              >
                <v-icon> mdi-send </v-icon>
              </v-btn>
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
         
          { text: 'Hospital', value: 'hospital-name',sortable: false },
          { text: 'Amka', value: 'AMKA',sortable: false },
          { text: 'Date', value: 'date' },
          { text: 'Status', value: 'status' },
          { text: "Actions", value: "actions", sortable: false }
         
        ],
      
      }
    },
    mounted () {
      this.initVaccinations()
    },
   computed:{
     ...mapState({vaccinationsAll: state=>state.vaccinations.vaccinations}),

     vaccinations(){
        return this.getVaccination();
     }
   },
   methods: {
      async initVaccinations (){
        this.loading=true
         await this.$store.dispatch('loadVaccinations',this.$store.state.auth.hospital.username)
         
         this.loading=false
      },
      getVaccination(){
        var merged=[];
        console.log(this.vaccinationsAll)
       this.vaccinationsAll.forEach(element => {
        merged.push({...element[0] ,...element[1]}
          );
       });
        
        console.log(this.vaccinationsAll)
        console.log(merged)
        return merged;
      }
    
   }
   }
  
</script>

<style  scoped>

</style>