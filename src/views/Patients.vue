<template>
  <v-container class="mt-12">
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#61ba9f">
          <v-toolbar color="#61ba9f" dark shaped>
            <v-card left elevation="1" class="my-2 ml-2 pa-2" flat color="#69c2a7">
              <NewPatient />
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
            :items="patients"
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
               
                outlined
                fab
                
                class="mr-2"
                color="#03A9F4"
                @click="showEditPatient(item)"
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                small
                
                outlined
               
                fab
                class="mr-4"
                color="#e17b58"
                @click="showDeletePatient(item)"
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
            >Edit Patient Information</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="editDialog = false">mdi-close</v-icon>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="mx-4"
                v-model="editedPatient.name"
                 :error-messages="nameErrors"
                 @change="$v.editedPatient.name.$touch()"
                label="Full Name*"
                required
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                class="mx-4"
                label="Amka*"
                v-model="editedPatient.amka"
                :error-messages="amkaErrors"
                @change="$v.editedPatient.amka.$touch()"
                required
                clearable
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                class="mx-4"
                v-model.number="editedPatient.age"
                :error-messages="ageErrors"
                @change="$v.editedPatient.age.$touch()"
                label="Age*"
                required
                clearable
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                class="mr-4 "
                v-model="editedPatient.sex"
                :error-messages="sexErrors"
                @change="$v.editedPatient.sex.$touch()"
                :items="['FEMALE', 'MALE']"
                label="Sex*"
                required
                rounded
                background-color="#d7eae5"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedPatient.address"
                :error-messages="addressErrors"
                @change="$v.editedPatient.address.$touch()"
                class="mx-4"
                label="Address*"
                required
                clearable
              ></v-text-field>
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
            @click="editPatient"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Delete Patient</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="deleteDialog = false">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
            <v-card-title>
              <h4>
                Are you sure you want to delete this patient?
              </h4></v-card-title
            >
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="4">
                  <h5>
                    Patient Name:
                    <h6>{{ toDeletePatient.name }}</h6>
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                  <h5>
                    Amka:
                    <h6>{{ toDeletePatient.amka }}</h6>
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
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            class="mx-3 mb-6"
            color="#61ba9f"
            outlined
            rounded
            @click="deletePatient"
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
import NewPatient from "@/components/NewPatient.vue";
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required, helpers, minValue,integer,minLength,maxLength } from "vuelidate/lib/validators";
const containNumbers = helpers.regex("containNumbers", /\w\s\d+/);
const alpha = helpers.regex("alpha", /^[a-zA-Z ]*$/);


export default {
  components: { NewPatient },
  mixins: [validationMixin],
  validations: {
   editedPatient: {
      name: { required, alpha},
      amka: { required, integer, minValue: minValue(0),minLength: minLength(11), maxLength:maxLength(11)},
      address : { required, containNumbers },
      age: { required, integer, minValue: minValue(0) },

      sex:{required},
    },
  },
  

  data() {
    return {
      search: "",
      
      editDialog: false,
      deleteDialog: false,
      editedPatient:{},
      
      loading: false,
      toDeletePatient: {},
      snackbar2: false,
      timeout2: 2000,
      color2: "",
      text2: "",

      headers: [
        {
          text: "Amka",
          align: "start",
          sortable: false,
          value: "amka",
        },
        { text: "Full Name", value: "name" },
        { text: "Sex", value: "sex" },
        { text: "Age", value: "age" },
        { text: "Address", value: "address", sortable: false },
        { text: "Status", value: "status", sortable:true },
        { text: "Symptoms", value: "symptoms", sortable: false},
        
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.initPatients();
  },
  computed: {
    ...mapState({ patients: (state) => state.patients.patients }),

    nameErrors() {
      const errors = [];
      if (!this.$v.editedPatient.name.$dirty) return errors;
      !this.$v.editedPatient.name.alpha &&
        errors.push("Patient's name is alphabetic character");
      !this.$v.editedPatient.name.required &&
        errors.push("Patient's name is required");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.editedPatient.age.$dirty) return errors;

      !this.$v.editedPatient.age.required &&
        errors.push("Patient's age is required");
      !this.$v.editedPatient.age.integer &&
        errors.push("Age is number");
      !this.$v.editedPatient.age.minValue &&
        errors.push("Age should be a positive number");
      
      return errors;
    },
    
    sexErrors() {
      const errors = [];
      if (!this.$v.editedPatient.sex.$dirty) return errors;
      
      !this.$v.editedPatient.sex.required &&
        errors.push("Patient's sex is required");
      return errors;
    },
    
    amkaErrors() {
      const errors = [];
      if (!this.$v.editedPatient.amka.$dirty) return errors;
      !this.$v.editedPatient.amka.integer &&
        errors.push("Amka should be number");
      !this.$v.editedPatient.amka.minValue &&
        errors.push("Please give a valid number");
    
      !this.$v.editedPatient.amka.minLength &&
        errors.push("Amka should be 11 numbers");
      !this.$v.editedPatient.amka.maxLength &&
        errors.push("Amka should be 11 numbers");
      !this.$v.editedPatient.amka.required &&
        errors.push("Amka is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.editedPatient.address.$dirty) return errors;
      !this.$v.editedPatient.address.required && errors.push("Address is required");
      // test if there is a number in the address
      !this.$v.editedPatient.address.containNumbers &&
        errors.push("Address not contain numbers");

      return errors;
    },
    
  },
 methods: {
 
    getColor(status) {
      if (status == "2/2") return "primary";
      
      else if (status == "0/2") return "error";
      else return "#e6cd4e";
    },
    showDeletePatient(item) {
      console.log(item);
      this.deleteDialog = true;
      this.toDeletePatient = item;
      
    },
    async deletePatient() {
      try {
        this.loading = true;
        await this.$store.dispatch("deletePatient",{username: this.$store.state.auth.hospital.username, patient:this.toDeletePatient.id});
        this.loading = false;
        this.deleteDialog = false;
        this.snackbar2 = true;
        this.text2 = "Patient Deleted Successfully";
        this.color2 = "#9ce690";
        this.initPatients();
      } catch (error) {
        this.snackbar2 = true;
        this.color2 = "#e17b58";
        this.text2 =
          "Couldn't delete patient. Please check your internet connection";
        console.log("something went wrong here", error);
      }
    },
    showEditPatient(item) {
      console.log(item);
      this.editDialog = true;
      this.editedPatient = item;
      
    },
    async editPatient() {
      try {
        this.loading = true;
        await this.$store.dispatch("editPatient",{username: this.$store.state.auth.hospital.username ,patient:this.editedPatient});
        this.loading = false;
        this.editDialog = false;
        this.snackbar2 = true;
        this.text2 = "Patient Edited Successfully";
        this.color2 = "#9ce690";
        this.initPatients();
      } catch (error) {
        this.snackbar2 = true;
        this.color2 = "#e17b58";
        this.text2 =
          "Couldn't edit patient. Please check your internet connection";
        console.log("something went wrong here", error);
      }
    },
    async initPatients() {
      this.loading = true;
      await this.$store.dispatch("loadPatients",this.$store.state.auth.hospital.username);
      this.loading = false;
    },
  },
};
</script>

<style  scoped>
</style>

