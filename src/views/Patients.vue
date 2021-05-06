<template>
  <v-card>
    <v-card-title>
      Patients
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="patients"
      :search="search"
      :loading="loadTable"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import PatientsDataService from "../services/patients.service";
//import PatientsUserService from "../services/patients.service";
export default {
  data() {
    return {
      search: "",
      loadTable: true,
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Age", value: "age" },
        { text: "Sex", value: "sex" },
        { text: "Amka", value: "amka" },
        { text: "Address", value: "address" },
        { text: "Status", value: "status" },
        { text: "Symptoms", value: "symptoms" },
      ],
      patients: [],
    };
  },
  mounted() {
    PatientsDataService.getAllPatients()
      .then((response) => {
        this.patients = response.data;
        this.loadTable = false;
      })
      .catch((error) => {
        console.log("there was an error:", error.response);
      });
  },
};
</script>


