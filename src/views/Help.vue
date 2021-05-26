<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#61ba9f">
          <v-toolbar color="#61ba9f" dark shaped>
            <v-card left class="my-2 ml-2" flat color="#61ba9f">
              <NewVaccination />
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
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
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
                @click="showTransferVaccination(item)"
              >
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
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
                  type="date">
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
                  :error-messages="brandErrors"
                 @change="$v.editedVaccination.brand.$touch()"
                ></v-select>
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

    <v-dialog v-model="transferDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Transfer Vaccination</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="tranferDialog = false">mdi-close</v-icon>
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
                    <h6>{{ toTranferVaccination.AMKA }}</h6>
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                  <h5>
                    Amka:
                    <h6>{{ toTranferVaccination.date }}</h6>
                  </h5>
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
            @click="tranferDialog = false"
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

    <v-snackbar
      v-model="snackbar2"
      :timeout="timeout2"
      :color="color2"
      rounded="pill"
      top
    >
      {{ text2 }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar2 = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import NewVaccination from "@/components/NewVaccination.vue";
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";



export default {
  components: { NewVaccination },
  mixins: [validationMixin],
  validations: {
   editedVaccination: {
      date: { required},
      brand: { required },
      
    },
  },
  

  data() {
    return {
      search: "",
      
      editDialog: false,
      transferDialog: false,
      editedVaccination:{},
      
      loading: false,
      toTranferVaccination: {},
      snackbar2: false,
      timeout2: 2000,
      color2: "",
      text2: "",

      headers: [
        {
          text: "Hospital",
          align: "start",
          sortable: false,
          value: "hosp",
        },
        { text: "Amka", value: "AMKA",sortable: false },
        { text: "Date", value: "date" },
        
       
        { text: "Actions", value: "actions", sortable: false }
      ],
    };
  },
  mounted() {
    this.initVaccinations();
  },
  computed: {
    brandErrors() {
    const errors = [];
    if (!this.$v.editedVaccination.brand.$dirty) return errors;
      
      !this.$v.editedVaccination.brand.required &&
        errors.push("Vaccine's Brand is required");
      return errors;
    }, 
    dateErrors() {
    const errors = [];
    if (!this.$v.editedVaccination.date.$dirty) return errors;
      
      !this.$v.editedVaccination.date.required &&
        errors.push("Date is required");
      return errors;
    },
    ...mapState({ vaccinations: (state) => state.vaccinations.vaccinations }),

    
    
    
    
   
 
    
  },
 methods: {
 
   // getColor(status) {
     // if (status == "COMPLETED") return "#9ce690";
    //  else if (status == "CANCELED") return "#e17b58";
    //  else if (status == "AVAILABLE") return "light blue";
    //  else return "#e6cd4e";
   // },
    showTransferVaccination(item) {
      console.log(item);
      this.transferDialog = true;
      this.toTransferVaccination = item;
      
    },
    async transferVaccination() {
     // try {
        this.loading = true;
    //   await this.$store.dispatch("deletePatient", this.toTransferVaccination.id);
     //   this.loading = false;
//this.deleteDialog = false;
      //  this.snackbar2 = true;
      //  this.text2 = "Patient Deleted Successfully";
      //  this.color2 = "#9ce690";
     //   this.initPatients();
     // } catch (error) {
      //  this.snackbar2 = true;
     //   this.color2 = "#e17b58";
      //  this.text2 =
     //     "Couldn't delete patient. Please check your internet connection";
      //  console.log("something went wrong here", error);
   //   }
    },
    showEditVaccination(item) {
      console.log(item);
      this.editDialog = true;
      this.editedVaccination = item;
      
    },
    async editVaccination() {
      //try {
       // this.loading = true;
       // await this.$store.dispatch("editVaccination", this.editedVaccination);
       // this.loading = false;
       // this.editDialog = false;
       // this.snackbar2 = true;
       // this.text2 = "Vaccination Edited Successfully";
       // this.color2 = "#9ce690";
      //  this.initVaccinations();
     // } catch (error) {
       // this.snackbar2 = true;
      //  this.color2 = "#e17b58";
        //this.text2 =
      //    "Couldn't edit patient. Please check your internet connection";
      //  console.log("something went wrong here", error);
     // }
    },
    async initVaccinations() {
      this.loading = true;
      await this.$store.dispatch("loadVaccinations");
      this.loading = false;
    },
  },
};
</script>

<style  scoped>
</style>

