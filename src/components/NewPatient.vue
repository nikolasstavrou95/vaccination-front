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
                  :error-messages="nameErrors"
                  label="Full Name*"
                  required
                  clearable
                  @change="$v.patient.name.$touch()"
                 
                 
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
                  :error-messages="amkaErrors"
                  required
                  clearable
                  type="number"
                  @change="$v.patient.amka.$touch()"
                 
                ></v-text-field>
              </v-col>
              
                 <v-col cols="12" md="3">
                <v-text-field
                class="mx-4"
                v-model.number="patient.age"
                :error-messages="ageErrors"
                  label="Age*"
                  required
                  clearable
                  type="number"
                  @change="$v.patient.age.$touch()"
                 
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                class="mr-4"
                  v-model="patient.sex"
                  :error-messages="sexErrors"
                  :items="['FEMALE', 'MALE']"
                  label="Sex*"
          
                  required
                  rounded
                  background-color="#d7eae5"
                  @change="$v.patient.sex.$touch()"

                ></v-select>
              </v-col>
              <v-col
                cols="12">
              <v-text-field
                v-model="patient.address"
                :error-messages="addressErrors"
                class="mx-4"
                label="Address*"
                required
                clearable
                @change="$v.patient.address.$touch()"
                ></v-text-field>
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
import { validationMixin } from "vuelidate";
import { required, helpers, minValue,integer, minLength,maxLength } from "vuelidate/lib/validators";
const containNumbers = helpers.regex("containNumbers", /\w\s\d+/);
const alpha = helpers.regex("alpha", /^[a-zA-Z ]*$/);

export default {
  mixins: [validationMixin],
  validations: {
   patient: {
      name: { required, alpha},
      amka: { required, integer, minValue: minValue(0),minLength: minLength(11), maxLength:maxLength(11)},
      address : { required, containNumbers },
      age: { required, integer, minValue: minValue(0) },
     
      sex:{required},
    },
  },

 
  data() {
    return {
     dialog:false,
     snackbar:false,
     text:"",
     color:"",
    timeout: 2000,
    loading:false,
  
     patient:{
     
     }
    
    }
  },
  computed:{
    nameErrors() {
      const errors = [];
      if (!this.$v.patient.name.$dirty) return errors;
      !this.$v.patient.name.alpha &&
        errors.push("Patient's name is alphabetic character");
      !this.$v.patient.name.required &&
        errors.push("Patient's name is required");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.patient.age.$dirty) return errors;

      !this.$v.patient.age.required &&
        errors.push("Patient's age is required");
      !this.$v.patient.age.integer &&
        errors.push("Age is number");
      !this.$v.patient.age.minValue &&
        errors.push("Age should be a positive number");
      
      return errors;
    },
    
    sexErrors() {
      const errors = [];
      if (!this.$v.patient.sex.$dirty) return errors;
      
      !this.$v.patient.sex.required &&
        errors.push("Patient's sex is required");
      return errors;
    },
    
    amkaErrors() {
      const errors = [];
      if (!this.$v.patient.amka.$dirty) return errors;
      !this.$v.patient.amka.integer &&
        errors.push("Amka should be number");
      !this.$v.patient.amka.minValue &&
        errors.push("Please give a valid number");
      !this.$v.patient.amka.minLength &&
        errors.push("Amka should be 11 numbers");
      !this.$v.patient.amka.maxLength &&
        errors.push("Amka should be 11 numbers");
      !this.$v.patient.amka.required &&
        errors.push("Amka is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.patient.address.$dirty) return errors;
      !this.$v.patient.address.required && errors.push("Address is required");
      // test if there is a number in the address
      !this.$v.patient.address.containNumbers &&
        errors.push("Address not contain numbers");

      return errors;
    },
    

  },
   methods: {
   async savePatient() {
     
     this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorMessage = "All the fields are required";
      }else { 
        try{
          var data = {
            address: this.patient.address,
            age:this.patient.age,
            amka:this.patient.amka,
            name:this.patient.name,
            sex:this.patient.sex
          }
      this.loading = true
    let response= await this.$store.dispatch('addPatient',{username: this.$store.state.auth.hospital.username, patient:data})

    
       this.loading = false
       this.dialog=false  
       this.resetFields()
       this.$store.dispatch('loadPatients',this.$store.state.auth.hospital.username) 
       this.$store.dispatch("loadUnPatients", this.$store.state.auth.hospital.username)
     
    
        
        this.snackbar=true
      this.text="Patient Added Successfully"
      this.color="#9ce690"
      if(response){
          throw new Error('error')
        }
       }
      
        
      
       catch(error){
       this.snackbar=true
       this.color="#e17b58"
       this.text="Couldn't add patient. Please check your internet connection"
        console.log("something went wrong here",error)
        
      }
      }
   },
      resetFields() {
       this.$v.$reset()
       this.patient.name="",
       this.patient.age="",
       
       this.patient.sex="",
       
       this.patient.amka="",
       this.patient.address=""
    },
    
   }

}
 
 
  
  
</script>


<style>
     
</style>