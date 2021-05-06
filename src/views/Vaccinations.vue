<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="vaccinations"
        sort-by="date"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Vaccinations</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedVaccination.hospital"
                          label="Hospital"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedVaccination.patient"
                          label="Patient"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedVaccination.vaccine"
                          label="Vaccine"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedVaccination.date"
                          label="Date"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedVaccination.status"
                          label="Status"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteVaccinationConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editVaccination(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteVaccination(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="retrieveVaccinations"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>  

<script>
import VaccinationsDataService from "../services/VaccinationsDataService";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Hospital",
        align: "start",
        sortable: false,
        value: "hospital",
      },
      { text: "Patient", value: "patient", sortable: false },
      { text: "Vaccine", value: "vaccine", sortable: false },
      { text: "Date", value: "date" },
      { text: "Status", value: "status" },
      { text: "", value: "actions", sortable: false },
    ],
    vaccinations: [],
    editedIndex: -1,
    editedVaccination: {
      hospital: "",
      patient: "",
      vaccine: "",
      date: "",
      status: "",
    },
    defaultVaccination: {
      hospital: "",
      patient: "",
      vaccine: "",
      date: "",
      status: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.retrieveVaccinations();
  },

  methods: {
    retrieveVaccinations() {
      VaccinationsDataService.getAllVaccinations()
        .then((response) => {
          this.vaccinations = response.data.map(this.getDisplayVaccination);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editVaccination(item) {
      this.editedIndex = this.vaccinations.indexOf(item);
      this.editedVaccination = Object.assign({}, item);
      this.dialog = true;
    },

    deleteVaccination(item) {
      this.editedIndex = this.vaccinations.indexOf(item);
      this.editedVaccination = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteVaccinationConfirm() {
      this.vaccinations.splice(this.editedIndex, 1);
      this.closeDelete();
      VaccinationsDataService.deleteVaccination(1); //Have to find a way to pass the id
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedVaccination = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedVaccination = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    getDisplayVaccination(vaccination) {
      return {
        id: vaccination.id,
        hospital: vaccination.hospital,
        patient: vaccination.patient,
        vaccine: vaccination.vaccine,
        date: vaccination.date,
        status: vaccination.status,
      };
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.vaccinations[this.editedIndex],
          this.editedVaccination
        );
        VaccinationsDataService.updateVaccination(1, this.editedVaccination); //Have to find a way to select ids
      } else {
        this.vaccinations.push(this.editedVaccination);
        VaccinationsDataService.createVaccination(this.editedVaccination);
      }
      this.close();
    },
  },
};
</script>
