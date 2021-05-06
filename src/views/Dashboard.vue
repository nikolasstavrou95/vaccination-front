<template>
  <v-container>
    <v-flex>
      <v-card v-if="hospital">
        <v-row>
          <v-card-title> Profile </v-card-title>
        </v-row>

        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-phone </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ hospital.phone_number }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset> </v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light blue"> mdi-email </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ hospital.email }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-map-marker </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle>{{
                hospital.city + ", " + hospital.country
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <p v-if="!hospital">{{ error }}</p>
    </v-flex>
  </v-container>
</template>



<script>
import HospitalDataService from "../services/user.service";
export default {
  name: "Dashboard",
  data() {
    return {
      hospital: null,
      currentUser: this.$store.state.auth.hospital,
      error: "",
    };
  },
  // computed: {
  //   currentUser() {
  //     return this.$store.state.auth.hospital;
  //   },
  // },
  mounted() {
    HospitalDataService.getHospitalData(
      this.$store.state.auth.hospital.username
    )
      .then((response) => {
        this.hospital = response.data;
      })
      .catch((errors) => {
        this.error = `${errors.response.error}`;
      });
  },
};
</script>