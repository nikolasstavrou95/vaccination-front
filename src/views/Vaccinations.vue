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
                :disabled="item.status ==='CANCELLED'"

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
                :disabled="item.status==='DONE' || item.status==='CANCELLED'"
              >
                <v-icon> mdi-send </v-icon>
              </v-btn>
            
              <v-tooltip bottom v-if="!item.transferable">
             <template v-slot:activator="{ on, attrs }">
                 <v-icon
                 color="#e17b58"
                 dark
                 v-bind="attrs"
                 v-on="on"
                 >
                 mdi-flag
                </v-icon>
              </template>
              <span>This vaccination needs transfer!</span>
           </v-tooltip>
            </template>
    
 
     

       
    </v-data-table>
  </v-card>

  </v-col>
  </v-row>
   <v-dialog v-model="transferDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Transfer Vaccination</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="transferDialog = false">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
            <v-card-title>
              <h4>
                Are you sure you want to tranfer this vaccination?
              </h4></v-card-title
            >
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="4">
                  <h5>
                    Patient Name:
                    <h6>{{ toTranferVaccination.name}}</h6>
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                  <h5>
                    Status:
                    <h6>{{ toTranferVaccination.status }}</h6>
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select
                 class="mx-4"
                 v-model="toTranferVaccination.next"
                  :items="hospitals"
                  label="Hospitals*"
                  required
                  rounded
                  background-color="#d7eae5"
                  :error-messages="hospitalsErrors"
                 @change="$v.toTranferVaccination.next.$touch()"
                ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mb-6"
            color="#e17b58"
            outlined
            rounded
            @click="transferDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            class="mx-3 mb-6"
            color="#61ba9f"
            outlined
            rounded
            @click="tranferVaccination"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4"
            >Edit Vaccination</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="editDialog = false">mdi-close</v-icon>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12">
             <v-text-field
                class="mx-4"
                v-model="editedVaccination.date"
                  label="Date*"
                  required
                  clearable
                   @change="$v.editedVaccination.date.$touch()"
                   :error-messages="dateErrors"
                    type="date"
                    :disabled="editedVaccination.status ==='DONE'"
                 >
                    </v-text-field>
            </v-col>

            <v-col
                cols="12" md="6" >
                  <v-select
                 class="mx-4"
                 v-model="editedVaccination.brand"
                  :items="['ASTRAZENECA', 'JOHNSON','MODERNA','PFIZER']"
                  label="Brand*"
                  required
                  rounded
                  background-color="#d7eae5"
                  
                
                  :disabled=true
                ></v-select>
              </v-col>
             <v-col
                cols="12" md="6" >
                  <v-select
                 class="mx-4"
                 v-model="editedVaccination.status"
                  :items="['DONE','PENDING','CANCELLED']"
                  label="Status*"
                  required
                  rounded
                  background-color="#d7eae5"
                  :disabled="editedVaccination.status ==='DONE'"
                   @change="$v.editedVaccination.status.$touch()"
                 
                
                ></v-select>
             </v-col>
                 <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                class="mx-4"
                v-model="editedVaccination.symptoms"
                  :items="['Headache', 'Nausea', 'Fatigue', 'Fever', 'Muscle Pain', 'Blood Clots', 'Chest Pain','Normal']"
                  label="Symptoms"
                   multiple
                   required
                   clearable
                   rounded
                  background-color="#d7eae5" 
                  :error-messages="symptomsErrors"
                  v-if="editedVaccination.status ==='DONE'"
                  @change="$v.editedVaccination.symptoms.$touch()"
                 
                ></v-autocomplete>
              </v-col>

            
           
           
          
           
          </v-row>
          <small class="ml-4">*indicates required field</small>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mb-6"
            color="#e17b58"
            outlined
            rounded
            @click="editDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            class="mx-3 mb-6"
            color="#61ba9f"
            outlined
            rounded
            @click="editVaccination"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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








  
</v-container>
 
  
  
</template>

<script>

import NewVaccination from '@/components/NewVaccination.vue';
import {mapState} from 'vuex';
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import vaccinationsService from "@/services/vaccinationsService.js";

  export default {
    components:{NewVaccination},
    mixins: [validationMixin],
  validations: {
   editedVaccination: {
     
      brand:{required},
      date : { required},
      symptoms:{required}
      
    },
    toTranferVaccination:{
      next:{required}

    }},
    
    data() {
      return {
        search: '',
       
      
       loading:false,
      
        headers: [
         
          
          { text: 'Name', value: 'name' },
          { text: 'Amka', value: 'AMKA',sortable: false },

          { text: 'Date', value: 'date' },
          { text: 'Status', value: 'status' },
          { text: 'Brand', value: 'brand' },
          
          { text: "Actions", value: "actions", sortable: false }
         
        ],
        transferDialog:false,
        toTranferVaccination: {},
        editDialog:false,
        editedVaccination: {},
        snackbar2: false,
        timeout2: 2000,
        message: "",
        color2:"",

      
      }
    },
    mounted () {
      this.initVaccinations();
     
    },
   computed:{
     ...mapState(
       {vaccinationsAll: state=>state.vaccinations.vaccinations},
     ),
      hospitals(){
        return this.$store.state.hospital.transferableHospitals;
      },
     

     vaccinations(){
        return this.$store.state.vaccinations.vaccinations;
     },
     
     

      brandErrors() {
    const errors = [];
    if (!this.$v.editedVaccination.brand.$dirty) return errors;
      
      !this.$v.editedVaccination.brand.required &&
        errors.push("Brand is required");
      return errors;
    }, 
    symptomsErrors() {
    const errors = [];
    if (!this.$v.editedVaccination.symptoms.$dirty) return errors;
      
      !this.$v.editedVaccination.symptoms.required &&
        errors.push("Symptoms are required");
      return errors;
    }, 
    dateErrors() {
    const errors = [];
    if (!this.$v.editedVaccination.date.$dirty) return errors;
      
      !this.$v.editedVaccination.date.required &&
        errors.push("Date is required");
      return errors;
    },
    hospitalsErrors() {
    const errors = [];
    if (!this.$v.toTranferVaccination.next.$dirty) return errors;
      
      !this.$v.toTranferVaccination.next.required &&
        errors.push("Hospital is required");
      return errors;
    }
   },
   methods: {
      async initVaccinations (){
        this.loading=true
         await this.$store.dispatch('loadVaccinations',this.$store.state.auth.hospital.username)
         
         this.loading=false
      },
      
      showTransVaccination(item){
        this.transferDialog = true;
        this.toTranferVaccination= item;
         this.getHospitals();
         console.log(this.hospitals);

      },
      async tranferVaccination(){

       
         var data = {
          date: this.toTranferVaccination.date,
          brand: this.toTranferVaccination['vaccine-brand'],
          amka: this.toTranferVaccination.AMKA,
          status: this.toTranferVaccination.status,
          next: this.toTranferVaccination.next

        }
         this.loading = true;
        this.$v.$touch();
          if (this.$v.$invalid) {
            this.loading=false;}
          else{

           try{
          
         
           this.loading = true;
           await vaccinationsService.transferVaccination(this.$store.state.auth.hospital.username,this.toTranferVaccination.transid, data)
        
       
           this.loading=false;
           this.transferDialog = false;

           }catch(err){
           this.color2="#e17b58";
           this.message=`Couldn't edit this vaccination. An error occured during request (${err})`
           this.snackbar2 = true;
           this.transferDialog = false;
           this.loading=false
       
      }
        }
        

      },
      showEditVaccination(item){

        this.editDialog = true;
        this.editedVaccination= item;
      },
      async editVaccination(){
        var data = {
          date: this.editedVaccination.date,
          brand: this.editedVaccination.brand,
          amka: this.editedVaccination.AMKA,
          status: this.editedVaccination.status,
          

        }
        this.$v.$touch();
          if (this.$v.$invalid) {
          this.loading = false;}
          else{
             try{
          
      
           this.loading=true
           const response = await this.$store.dispatch('editVaccination',{username:this.$store.state.auth.hospital.username, transid: this.editedVaccination.transid, vaccination: data})
        
          if(response){
            throw new Error()}
          this.editDialog=false;
          this.loading = false;
          this.$store.dispatch("loadUnPatients", this.$store.state.auth.hospital.username)
          }catch(err){
           this.color2="#e17b58";
           this.message=`Couldn't edit this vaccination. An error occured during request (${err})`
           this.snackbar2 = true;
           this.loading= false;
       
      }

      }
   },
     async getHospitals(){
       
       try{
       const response = await this.$store.dispatch('loadTransferableHospitals', {username: this.$store.state.auth.hospital.username, brand: this.toTranferVaccination.brand})

         if(response){
            throw new Error()}

         
       }catch(error){
           this.color2="#e17b58";
           this.message=`Couldn't load Hospitals. An error occured during request (${error})`
           this.snackbar2 = true;
          
       
       }
       
     },
     check(status){
       if(status==='DONE'){
         return true;
       }
       return false;
     }

   }
  }
  
</script>

<style  scoped>

</style>