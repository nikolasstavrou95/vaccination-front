<template>
   <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="vaccines"
        sort-by="doses"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Vaccines</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Vaccine
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccine.brand"
                          label="Brand"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccine.doses"
                          label="Doses"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteVaccinationConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editVaccine(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteVaccine(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="retrieveVaccines"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>  

<script>

import VaccinesDataService from "../services/VaccinesDataService";

  export default {
      data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
          {
            text: 'Brand',
            align: 'start',
            sortable: false,
            value: 'brand',
          },
          { text: 'Doses', value: 'doses', sortable: false },
          { text: '', value: 'actions', sortable: false },
        ],
      vaccines: [],
      editedIndex: -1,
      editedVaccine: {
        brand: '',
        doses: '',
      },
      defaultVaccine: {
        brand: '',
        doses: '',
      },
    }),

    created () {
      this.retrieveVaccines()
    },

    methods: {
      retrieveVaccines() {
        VaccinesDataService.getAllVaccines()
          .then((response) => {
            this.vaccines = response.data.map(this.getDisplayVaccine);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      getDisplayVaccine(vaccine) {
      return {
        id: vaccine.id,
        brand: vaccine.brand,
        doses: vaccine.doses,
      };
    },
    }
  }
</script>