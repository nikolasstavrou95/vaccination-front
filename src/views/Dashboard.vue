<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="4">
      <v-container>
       <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
             {{vaccinesCard.title}}
            </h3>
            <h6 class="subtitle-2 font-weight-light">to this local hospital</h6>
            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center">
                <span class="info--text">
                  <v-img
                    :src="vaccinesCard.image"
                    width="80"
                  />
                </span>
                <h3 class="font-weight-regular align-self-center ml-4">{{availableVaccines}}</h3>
              </div>
            </div>
          </v-card-text>
          <v-footer>
            <v-btn
            color="primary"
            small
            outlined
            rounded
            @click="showAddVaccinesDialog"
            
          
            >{{vaccinesCard.btnLabel}}</v-btn
            >
          </v-footer>
        </v-card>
       
      </v-container>
      </v-col>
      <v-col cols="12" lg="4">
        <info-card :title="vaccinationCard.title" :img="vaccinationCard.image" :btnLabel="vaccinationCard.btnLabel" :link="vaccinationCard.link" :number="vaccinationCard.number"></info-card>
        
      </v-col>
      <v-col cols="12" lg="4">
        <info-card :title="pendingCard.title" :img="pendingCard.image" :btnLabel="pendingCard.btnLabel" :link="pendingCard.link" :number="pendingCard.number"></info-card>
      </v-col>
      <v-col cols="12" lg="8">
      
      </v-col>
    </v-row>
   
    <v-row>
      <patients></patients>
    </v-row>
   
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
  <v-dialog v-model="addVaccinesDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar color="#61ba9f" dark rounded>
          <v-toolbar-title class="mx-4">Do you have more Vaccines available?</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="addVaccinesDialog = false">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
            <v-card-title>
              <h4>
                Analytic List of available vaccines 
              </h4></v-card-title
            >
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="4">
                  <h5>
                   
                    <h6></h6>
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                  <h5>
                   
                    <h6></h6>
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
            @click="addVaccinesDialog = false"
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

  </v-container>
</template>


<script>
import InfoCard from '../components/InfoCard.vue';

export default {
  name: "Dashboard",
components: {
InfoCard
 
},
  data: () => ({
    vaccinesCard:{
      title:"Available Vaccines",
      image:"https://img.icons8.com/officel/80/000000/like--v1.png",
     
      btnLabel:"ADD MORE",
      link:"/user/vaccines",
     


    },
    vaccinationCard:{
      title:"Completed Vaccinations",
      image:"https://img.icons8.com/color/98/000000/checked--v4.png",
      number:"300",
      btnLabel:"SEE ALL",
      link:"/user/vaccinations"
    },
    pendingCard:{
      title:"Pending Vaccinations",
      image:"https://img.icons8.com/ios/100/000000/watch.png",
      number:"300",
      btnLabel:"SEE ALL",
      link:"/user/vaccinations"
    },
    snackbar2: false,
      timeout2: 2000,
      message: "",
      color2:"",
      addVaccinesDialog:false,



  }),
  computed: {
    availableVaccines(){
      if(this.$store.state.hospital.hospitalData){
      return this.$store.getters.availableVaccines;
      }
      return 0;
    }
    

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
    showAddVaccinesDialog(){
    this.addVaccinesDialog = true;
    },
    addVaccines(){
      console.log("nothing")
    }


    
    
  },
  
   mounted() {
    this.getHospital();
  }
};
</script>
