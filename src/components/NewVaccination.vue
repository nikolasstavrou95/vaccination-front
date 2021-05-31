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
        <v-icon class="mr-2">mdi-clipboard-plus</v-icon>
          New Vaccination
        </v-btn>
      </template>
      <v-card>
           <v-toolbar
      color="#61ba9f"
      dark
      rounded
    >
         <v-toolbar-title
         class="mx-4">Add New Vaccination </v-toolbar-title>
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
           <v-autocomplete
        v-model="vaccination.id"
        :items="unvaccinatedPatients"
        class="mx-4"
        :search="search"
        color="#d7eae5"
        no-data-text="Not Found.Please add Patient First"
        clearbale
        item-text="name"
        item-value="id"
        label="Search Patient by name*"
        prepend-icon="mdi-account-search"
        @change="$v.vaccination.id.$touch()"
        :error-messages="idErrors"
         background-color="#d7eae5"
        
         
      ></v-autocomplete>
              </v-col>
             
            
              <v-col cols="12" md="6">
                <v-text-field
                class="mx-4"
                v-model="vaccination.date"
                  label="Date*"
                  required
                  background-color="#d7eae5"
                  clearable
                   @change="$v.vaccination.date.$touch()"
                   :error-messages="dateErrors"
                  type="date">
                    </v-text-field>
              </v-col>
               <v-col
                cols="12" md="6" >
                  <v-select
                 class="mx-4"
                 v-model="vaccination.brand"
                  :items="vaccineList"
                  label="Brand*"
                  required
                  rounded
                  background-color="#d7eae5"
                  :error-messages="brandErrors"
                 @change="$v.vaccination.brand.$touch()"
                 @click="getVaccineList"
                ></v-select>
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
            @click="saveVaccination"
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
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
 mixins: [validationMixin],
  validations: {
   vaccination: {
      id: { required},
     brand:{required},
      date : { required}
    }},
  data() {
    return {
      dialog:false,
     snackbar:false,
     text:"",
     color:"",
     search: null,
    timeout: 2000,
    loading:false,
    vaccination: {
      
     
    },
    
      
    
    }
  },
  
   mounted() {
     this.$store.dispatch(
        "loadHospital",
        this.$store.state.auth.hospital.username
      ),
      this.$store.dispatch("loadPatients", this.$store.state.auth.hospital.username)
      this.$store.dispatch("loadUnPatients", this.$store.state.auth.hospital.username)
  },
   computed:{
   
     ...mapState({ hospital: (state) => state.auth.hospital.username, 
                  unvaccinatedPatients:(state) => state.patients.unvaccinated,
                   vaccineList: (state)=>state.vaccinations.patientVaccinesList
                  }),
    
  
    
     
   
    brandErrors() {
    const errors = [];
    if (!this.$v.vaccination.brand.$dirty) return errors;
      
      !this.$v.vaccination.brand.required &&
        errors.push("Vaccine's Brand is required");
      return errors;
    }, 
    dateErrors() {
    const errors = [];
    if (!this.$v.vaccination.date.$dirty) return errors;
      
      !this.$v.vaccination.date.required &&
        errors.push("Date is required");
      return errors;
    },
    idErrors() {
    const errors = [];
    if (!this.$v.vaccination.id.$dirty) return errors;
      
      !this.$v.vaccination.id.required &&
        errors.push("Please select a patient");
      return errors;
    },
   
                           
     },
  
   methods: {
   

   async saveVaccination() {
 
  var data = {
        id: this.vaccination.id,
        hosp:this.hospital,
      
        date: this.vaccination.date,
        brand: this.vaccination.brand
 }
 
    this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorMessage = "All the fields are required";
      }else { 
    try{
      this.loading = true
    
    let response = await this.$store.dispatch('addVaccination', {username: this.hospital, vaccination: data})
       this.loading = false
       this.dialog=false  
       this.resetFields()
       this.$store.dispatch('loadVaccinations',this.hospital)
        if(response){
        throw new Error()}
        this.snackbar=true
      this.text="Vaccination Added Successfully"
      this.color="#9ce690"
    }
      
       catch(error){
       this.snackbar=true
       this.color="#e17b58"
       this.text="Couldn't add vaccination. Please check your internet connection"
        console.log("something went wrong here",error)
        }
      }
   },
      resetFields() {
      //this.$refs.form.reset()
      
       
       this.vaccination.id="",
       this.vaccination.hosp="",
       this.vaccination.brand=""
       this.vaccination.date=""
      },

      async getVaccineList(){
        try{
        
         let response= await this.$store.dispatch('getVaccineList',{username:this.hospital,patientid: this.vaccination.id})

         if(response){
        throw new Error()}
        return this.$store.state.vaccinations.patientVaccinesList
        
      }catch(err){
        this.snackbar=true
       this.color="#e17b58"
       this.text="Couldn't load vaccines for current patient. Please check your internet connection"
        console.log("something went wrong here",err)
        }
      }
     
     
       
   }
}

  
   


 
  
  
</script>

<style scoped lang="sass">


</style>

