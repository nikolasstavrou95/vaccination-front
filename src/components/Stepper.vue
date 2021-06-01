<template>
<v-container>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
       
        step="1"
        editable
      >
        Add Patients
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        
        step="2"
        editable
      >
       Create / update appointment
      </v-stepper-step>

      <v-divider></v-divider>

      
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- <v-card
          class="mb-12"
          color="#d7eae5"
         height="200px"
        >
        <v-row justify="center">
        <v-col cols="12" md="6" >
         <v-autocomplete
        v-model="vaccination.id"
        :items="unvaccinatedPatients"
        class="mx-4 mt-8"
        :search="search"
        color="primary"
        hide-selected
        item-text="name"
        item-value="id"
        no-data-text="Not found.Please add Patient First"
        clearable
        label="Search Patient by name*"
        prepend-icon="mdi-account-search"
        @blur="$v.vaccination.id.$touch()"
        :error-messages="idErrors"
         background-color="#d7eae5"
        
         
      ></v-autocomplete>
        
        </v-col>
         <v-col cols="12" md="3"  class="mx-4 mt-14" >
             <NewPatient/>
         </v-col>
        </v-row>
        </v-card> -->
        <patients/>

       

       
      </v-stepper-content>

      <v-stepper-content step="2">
        <!-- <v-card
           class="mb-12"
          color="#d7eae5"
         height="200px"
        >
        <v-row justify="center">
             <v-col cols="12" md="4"  >
     
                <v-text-field
               class="mx-4 mt-8"
                v-model="vaccination.date"
                  label="Date*"
                  required
                  clearable
                  
                   @change="$v.vaccination.date.$touch()"
                   :error-messages="dateErrors"
                  type="date">
                    </v-text-field>
              </v-col>
               <v-col
                cols="12" md="4" >
                  <v-select
                class="mx-4 mt-8"
                 v-model="vaccination.brand"
                  :items="vaccineList"
                  label="Brand*"
                  required
                  rounded
                 :error-messages="brandErrors"
                 @change="$v.vaccination.brand.$touch()"
                 @click="getVaccineList"
                ></v-select>
              </v-col>
           
             
              
              
            </v-row>
        
        
         
        </v-card>-->
        <vaccinations/>

        
      </v-stepper-content>

     
    </v-stepper-items>
  </v-stepper>
</v-container>
</template>

  <script>

//import { mapState } from "vuex";
//import { validationMixin } from "vuelidate";
//import { required } from "vuelidate/lib/validators";
import Patients from '../views/Patients.vue';
import Vaccinations from '../views/Vaccinations.vue';

export default {
  components: { Patients, Vaccinations },
//  mixins: [validationMixin],
//   validations: {
//    vaccination: {
//       id: { required},
//      brand:{required},
//       date : { required}
//     }},
  data() {
    return {
      e1: 1,
     snackbar:false,
     text:"",
     color:"",
     search: null,
    timeout: 2000,
    loading:false,
    // vaccination: {
      
     
    // },
     
    }
  },
  
//    mounted() {
//      this.$store.dispatch(
//         "loadHospital",
//         this.$store.state.auth.hospital.username
//       ),
//       this.$store.dispatch("loadPatients", this.$store.state.auth.hospital.username)
//       this.$store.dispatch("loadUnPatients", this.$store.state.auth.hospital.username)
//   },
//    computed:{
   
//      ...mapState({ hospital: (state) => state.auth.hospital.username, 
//                   unvaccinatedPatients:(state) => state.patients.unvaccinated,
//                    vaccineList: (state)=>state.vaccinations.patientVaccinesList
//                   }),
    
  
    
     
   
//     brandErrors() {
//     const errors = [];
//     if (!this.$v.vaccination.brand.$dirty) return errors;
      
//       !this.$v.vaccination.brand.required &&
//         errors.push("Vaccine's Brand is required");
//       return errors;
//     }, 
//     dateErrors() {
//     const errors = [];
//     if (!this.$v.vaccination.date.$dirty) return errors;
      
//       !this.$v.vaccination.date.required &&
//         errors.push("Date is required");
//       return errors;
//     },
//     idErrors() {
//     const errors = [];
//     if (!this.$v.vaccination.id.$dirty) return errors;
      
//       !this.$v.vaccination.id.required &&
//         errors.push("Please select a patient");
//       return errors;
//     },
   
                           
//      },
  
//    methods: {
   

//    async saveVaccination() {
 
//   var data = {
//         id: this.vaccination.id,
//         hosp:this.hospital,
      
//         date: this.vaccination.date,
//         brand: this.vaccination.brand
//  }
 
//     this.$v.$touch();
//       if (this.$v.$invalid) {
//         this.errorMessage = "All the fields are required";
//       }else { 
//     try{
//       this.loading = true
    
//     let response = await this.$store.dispatch('addVaccination', {username: this.hospital, vaccination: data})
//        this.loading = false
//        this.e1 = 1
//        this.resetFields()
//        this.$store.dispatch('loadVaccinations',this.hospital)
//         if(response){
//         throw new Error()}
//         this.snackbar=true
//       this.text="Vaccination Added Successfully"
//       this.color="#9ce690"
//     }
      
//        catch(error){
//        this.snackbar=true
//        this.color="#e17b58"
//        this.text="Couldn't add vaccination. Please check your internet connection"
//         console.log("something went wrong here",error)
//         }
//       }
//    },
//       resetFields() {
//       //this.$refs.form.reset()
      
       
//        this.vaccination.id="",
//        this.vaccination.hosp="",
//        this.vaccination.brand=""
//        this.vaccination.date=""
//       },

//       async getVaccineList(){
//         try{
        
//          let response= await this.$store.dispatch('getVaccineList',{username:this.hospital,patientid: this.vaccination.id})

//          if(response){
//         throw new Error()}
//         return this.$store.state.vaccinations.patientVaccinesList
        
//       }catch(err){
//         this.snackbar=true
//        this.color="#e17b58"
//        this.text="Couldn't load vaccines for current patient. Please check your internet connection"
//         console.log("something went wrong here",err)
//         }
//       },
//       checkComplete(){
//          if (this.vaccination.id!=null) {
//         this.e1=2
//       }
      
//       },
      
     
       
 //  }
}  
 
  
</script>
