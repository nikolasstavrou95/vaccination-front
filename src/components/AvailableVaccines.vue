<template>
  <v-div>
    
    
      
       <v-card class="mx-auto" height="100%">
         
             <v-card-title class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
           {{vaccinesCard.title}}
            </h3>
             </v-card-title>
             <v-card-subtitle>
           <h6 class="subtitle-2 font-weight-light ml-1">at this local hospital</h6>
             </v-card-subtitle>
             <v-card-text>
            <v-container>
             <v-row justify="center">
               <v-col cols="6" >
                  <v-img
                    :src="vaccinesCard.image"
                    width="80"
                    class="ml-16"
                  /> 
           </v-col>
               <v-col cols="6" >
              <h3 class="font-weight-regular align-self-center mt-9 ml-2">{{availableVaccines}}</h3>

              </v-col>
             </v-row>
            </v-container>
          </v-card-text>
         
          <v-card-actions>
          
           
            <v-btn
            color="primary"
             class="ml-2 mb-2 mt-8"
            small
           
            rounded
            @click="showAddVaccines(true)"
            
          
            >{{vaccinesCard.btnLabel}}</v-btn
            >
            
            <v-spacer> </v-spacer>
            <v-btn
            color="primary"
            class="mr-2 mb-2 mt-8"
            small
            outlined
            rounded
            @click="showListVaccines(true)"
            
          
            >{{vaccinesCard.btnLabel2}}</v-btn
            >
            
          </v-card-actions>
        </v-card>
       
    
   
    <v-snackbar
      v-model="snackbar2"
      :timeout="timeout2"
      :color="color2"
      rounded="pill"
      top
      
     
      
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar2 = false"> Close </v-btn>
      </template>
    </v-snackbar>
  <v-dialog v-model="listVaccinesDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Analytic List of available vaccines </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="showListVaccines(false)">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
           
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="9">
                 <v-data-table
                 :headers="headers"
                 :items="list"
     
      
                 hide-default-footer
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
                </v-col>
              </v-row>
             
            </v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :loading="loading"
            class="mx-3 mb-6"
            color="#61ba9f"
            outlined
            rounded
            @click="showAddVaccines('true')"
          >
            ADD MORE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="addVaccinesDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Do you have more Vaccines available? (Select brand and quantity)</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="showAddVaccines(false)">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
           
            <v-card-text>
              
              <v-row justify="center">
                <v-col cols="12" class="mt-2" md="6">
                 <v-select
                 class="mx-4"
                 v-model="vaccine.brand"
                 :error-messages="vaccineErrors"
                  :items="['PFIZER','ASTRAZENECA','NOVAVAX','MODERNA','JOHNSON']"
                  label="Vaccine Brand*"
                  required
                  rounded
                  background-color="#d7eae5"
                  @change="$v.vaccine.brand.$touch()"
                ></v-select>
               
                </v-col>
                <v-col cols="12" class="mt-2" md="4">
                  <v-text-field
                   v-model="vaccine.number"
                   :error-messages="numberErrors"
                   prepend-inner-icon="mdi-needle"
                   required
                   @change="$v.vaccine.number.$touch()"
                   type="number"
                   label="Number*"
                  
                 ></v-text-field>
               
                </v-col>
                 
              </v-row>
              
                  
             
            </v-card-text>
          </v-row>
        </v-container>
      
        <v-card-actions>
            
          <v-spacer></v-spacer>
          <small class="mr-10">*indicates required field</small>
          <v-btn
            class="mb-6"
            color="#e17b58"
            outlined
            rounded
            
            @click="showAddVaccines(false)"
          >
            Cancel
          </v-btn>

          <v-btn
         :loading="loading"
            class="mx-3 mb-6"
            color="#61ba9f"
            outlined
            rounded
            @click="addVaccines"
          >
            ADD
          </v-btn>
        </v-card-actions>
      
      </v-card>
    </v-dialog>


  </v-div>
</template>


<script>

import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import HospitalDataService from "@/services/user.service.js";

export default {
  name: "Dashboard",
components: {

 
 

},
mixins: [validationMixin],
  validations: {
   vaccine: {
      brand: { required},
      number: { required, minValue: minValue(1)},
     
    },
  },
  data: () => ({
    vaccinesCard:{
      title:"Available Vaccines",
      image:"https://img.icons8.com/officel/80/000000/like--v1.png",
     
      btnLabel:"ADD MORE",
      btnLabel2:"SEE ALL",
     
     


    },
    vaccinationCard:{
      title:"Cancelled Vaccinations",
      image:"https://img.icons8.com/color/98/000000/checked--v4.png",
      number:"",
    
     
    },
    pendingCard:{
      title:"Transferable Vaccinations",
      image:"https://img.icons8.com/ios/100/000000/watch.png",
      
      

     
    },
    vaccinesList:[],
    list:[],
    snackbar2: false,
      timeout2: 2000,
      message: "",
      color2:"",
      addVaccinesDialog:false,
      listVaccinesDialog:false,
      loading:false,
      headers: [
         
          { text: 'Brand', value: 'label',sortable: false },
          { text: 'Total', value: 'totals',sortable: false }
      ],
      vaccine:{}


  }),
  computed: {
    availableVaccines(){
      return this.$store.state.hospital.availableVaccines
    },
    availableVaccinesByBrand(){
      return this.$store.state.hospital.vaccines;
    },
    vaccinations(){
      return this.$store.state.vaccinations.vaccinationsCancelled
    },
    needTransfer(){
      return this.$store.state.vaccinations.vaccinationsNeedTransfer
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.vaccine.number.$dirty) return errors;

      !this.$v.vaccine.number.required &&
        errors.push("Quantity is required");
     
      !this.$v.vaccine.number.minValue &&
        errors.push("Quantity should be a positive number");
      
      return errors;
    },
    vaccineErrors() {
      const errors = [];
      if (!this.$v.vaccine.brand.$dirty) return errors;

      !this.$v.vaccine.brand.required &&
        errors.push("Vaccine brand is required");
     
      return errors;
    },
    
    
    

  },
  methods:{
    async getHospital() {
      try{
       let response = await this.$store.dispatch(
        "loadHospital",
        this.$store.state.auth.hospital.username
      );

     
      if(response){
        throw new Error()}

      }catch(err){
        this.color2="#e17b58";
        this.message=`Couldn't show this Hospital data. An error occured during request (${err})`
        this.snackbar2 = true;
       
      }
    },
    async getAvailableVaccines() {
      
      try{
       let response = await this.$store.dispatch(
      'loadVaccines',
        this.$store.state.auth.hospital.username
      );

     
      if(response){
        throw new Error()}

      }catch(err){
        this.color2="#e17b58";
        this.message=`Couldn't show this Hospital data. An error occured during request (${err})`
        this.snackbar2 = true;
       
      }
    },
    async getAvailableVaccinesByBrand() {
      
      try{
       let response = await this.$store.dispatch(
      'loadVaccinesByBrand',
        this.$store.state.auth.hospital.username
      );
      
      if(response){
        throw new Error()}

      this.countAvailableVaccinesByBrand();

      }catch(err){
        this.color2="#e17b58";
        this.message=`Couldn't show this Hospital data. An error occured during request (${err})`
        this.snackbar2 = true;
       
      }
    },
    
   async addVaccines(){
     this.loading=true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.message = "Please give vaccine brand and quantity number";
        this.snackbar2=true;
        this.loading = false;
      } else {
     
     var data = {
       brand : this.vaccine.brand,
       quantity: this.vaccine.number,
       username: this.$store.state.auth.hospital.username
     }
    
     
       HospitalDataService.addVaccines(data).then(()=>{
        
        
        this.color2 = "#2d9277"; 
        this.message=`New Vaccines added successfully`
        this.snackbar2 = true;
        this.loading=false;
        this.getAvailableVaccines();
        this.getAvailableVaccinesByBrand();
        this.countAvailableVaccinesByBrand();
        this.clear();
       }).catch(err =>{
        this.color2="#e17b58";
        this.message=`Couldn't add vaccines you requested. An error occured during request (${err})`
        this.snackbar2 = true;
        this.loading= false;
        
      })
      }
    },
    showAddVaccines(condition){
      this.addVaccinesDialog = condition;
    },
    showListVaccines(condition){
      this.listVaccinesDialog= condition;
       this.getAvailableVaccinesByBrand();
     
      
    },
    clear(){
      this.$v.$reset()
      this.vaccine.brand=null;
      this.vaccine.number="";
    },
     countAvailableVaccinesByBrand(){
        
       this.list=[];
        let temp = this.availableVaccinesByBrand.reduce((r, a) => {
  
            r[a["brand"]] = [...r[a["brand"]] || [], a];
            return r;
           }, {});
           let objectArray = Object.entries(temp);
           objectArray.forEach(([key, value]) => {
            if(key!='undefined')  
             this.list.push({label: key, totals:value.length})
             
         });   
       
    },
    
   
  },
  
   mounted() {
    this.getHospital();
    this.getAvailableVaccines();
    this.getAvailableVaccinesByBrand();
    this.$store.dispatch('loadVaccinations', this.$store.state.auth.hospital.username)
    
    
  }
};
</script>


<style scoped>
.footer{
  background-color: black;
}
</style>