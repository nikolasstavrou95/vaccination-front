<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              Available Vaccines
            </h3>
            <h6 class="subtitle-2 font-weight-light">to this local hospital</h6>
            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center">
                <span class="info--text">
                  <v-img
                    src="https://img.icons8.com/officel/80/000000/like--v1.png"
                    width="80"
                  />
                </span>
                <h3 class="font-weight-regular align-self-center ml-4">100</h3>
              </div>
            </div>
          </v-card-text>
          <v-footer>
            <v-btn
            color="light-blue"
            small
            outlined
              rounded
              ><router-link to="/user/vaccinations"
                >Add more</router-link
              ></v-btn
            >
          </v-footer>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              Finished Vaccinations
            </h3>
            <h6 class="subtitle-2 font-weight-light">to this local hospital</h6>
            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center">
                <span class="info--text">
                  <v-img
                    src="https://img.icons8.com/color/98/000000/checked--v4.png"
                    width="80"
                  />
                </span>
                <h3 class="font-weight-regular align-self-center ml-4">300</h3>
              </div>
            </div>
          </v-card-text>
          <v-footer>
            <v-btn
             color="light-blue"
            small
            outlined
              rounded
              ><router-link to="/user/vaccinations">see all</router-link></v-btn
            >
          </v-footer>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              Pending Vaccinations
            </h3>
            <h6 class="subtitle-2 font-weight-light">to this local hospital</h6>
            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center">
                <span class="info--text">
                  <img
                    src="https://img.icons8.com/ios/100/000000/watch.png"
                    width="80"
                  />
                </span>
                <h3 class="font-weight-regular align-self-center ml-4">100</h3>
              </div>
            </div>
          </v-card-text>
          <v-footer>
            <v-btn 
             color="light-blue"
            small
            outlined
              rounded
              ><router-link to="/user/vaccinations">see all</router-link></v-btn
            >
          </v-footer>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
      
      </v-col>
    </v-row>
    <v-row>
      <patients></patients>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "Dashboard",
  data: () => ({}),
};
</script>