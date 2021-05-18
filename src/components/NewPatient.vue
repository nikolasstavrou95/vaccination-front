<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          large
          text
          v-bind="attrs"
          v-on="on"
        >
        <v-icon class="mr-2">mdi-account-plus</v-icon>
          New Patient
        </v-btn>
      </template>
      <v-card>
           <v-toolbar
      color="#61ba9f"
      dark
      rounded
    >
         <v-toolbar-title
         class="mx-4">Add New Patient </v-toolbar-title>
           <v-spacer></v-spacer>
           <v-icon 
         
          class='mx-4'
           @click="dialog=false">mdi-close</v-icon>
        
        </v-toolbar>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field 
                  class="mx-4"
                  v-model="patient.name"
                  label="Full Name*"
                  required
                  clearable
                 
                 
                ></v-text-field>
              </v-col>
             
              <v-col
                cols="12"
               
                md="6"
              >
                <v-text-field
                class="mx-4"
                  label="Amka*"
                  v-model="patient.amka"
                  required
                  clearable
                  type="number"
                 
                ></v-text-field>
              </v-col>
              
                 <v-col cols="12" md="3">
                <v-text-field
                class="mx-4"
                v-model.number="patient.age"
                  label="Age*"
                  required
                  clearable
                  type="number"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                class="mr-4 ml-2"
                  v-model="patient.sex"
                  :items="['FEMALE', 'MALE']"
                  label="Sex*"
          
                  required
                   rounded
                  background-color="#d7eae5"
                ></v-select>
              </v-col>
              <v-col
                cols="12">
              <v-text-field
                v-model="patient.address"
                class="mx-4"
                  label="Address*"
                  required
                   clearable
                
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                 <v-select
                 class="mx-4"
                 v-model="patient.status"
                  :items="['AVAILABLE', 'COMPLETED','PENDING','CANCELED']"
                  label="Status*"
                  required
                  rounded
                  background-color="#d7eae5"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                class="mx-4"
                v-model="patient.symptoms"
                  :items="['Headache', 'Nausea', 'Fatigue', 'Fever', 'Muscle Pain', 'Blood Clots', 'Chest Pain']"
                  label="Symptoms"
                   
                   clearable
                   rounded
                  background-color="#d7eae5" 
                 
                ></v-autocomplete>
              </v-col>
              
            </v-row>
                <small
                class="ml-4">*indicates required field</small>
          </v-container>
      
       
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          class="mx-3 mb-6"
            color="#e17b58"
           outlined
         
            rounded
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
          color="#4FC3F7"
           class="mx-3 mb-6"
           
            rounded
            
            outlined
        
            @click="resetFields"
          
          >
            Reset
          </v-btn>
          <v-btn 
           class="mx-3 mb-6"
            rounded
            color="#61ba9f"
           :loading="loading"
            outlined
            @click="savePatient"
          >
            Save
          </v-btn>
        </v-card-actions>
         
      </v-card>
    </v-dialog>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      rounded="pill"
      bottom
    >
       {{text}}

      <template v-slot:action="{ attrs }">
        <v-btn
         
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
    


    
</template>

<script>

export default {
 
  data() {
    return {
     dialog:false,
     snackbar:false,
     text:"",
     color:"",
    timeout: 2000,
    loading:false,
  
     patient:{
     // name:"",
      //age:0,
      //symptoms:"",
     // sex:"",
     // status:"",
     // amka:"",
      //address:""
     }
    
    }
  },
   methods: {
   async savePatient() {
    try{
      this.loading = true
     await this.$store.dispatch('addPatient', this.patient)
       this.loading = false
       this.dialog=false  
       this.resetFields()
       this.$store.dispatch('loadPatients') 
     
       //if (response.status==200){
        
        this.snackbar=true
      this.text="Patient Added Successfully"
      this.color="#9ce690"
       }
      // else if ( response.status==400 ){
     //  this.snackbar=true
      // this.color="#e17b58"
     //  this.text="Couldn't add patient. Please check your internet connection"
      // } 
       
      
       catch(error){
       this.snackbar=true
       this.color="#e17b58"
       this.text="Couldn't add patient. Please check your internet connection"
        console.log("something went wrong here",error)
        
      }
   },
      resetFields() {
      //this.$refs.form.reset()
       this.patient.name="",
       this.patient.age="",
       this.patient.symptoms="",
       this.patient.sex="",
       this.patient.status="",
       this.patient.amka="",
       this.patient.address=""
    },
    
   }

}
 
 
  
  
</script>


<style>
     
</style>