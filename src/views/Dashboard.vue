<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="4">
       
        <info-card :title="vaccinesCard.title" :img="vaccinesCard.image" :btnLabel="vaccinesCard.btnLabel" :link="vaccinesCard.link" :number="availableVaccines"></info-card>
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
          <v-toolbar-title class="mx-4">Add Vaccines</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mx-4" @click="addVaccinesDialog = false">mdi-close</v-icon>
        </v-toolbar>

        <v-container>
          <v-row justify="center">
            <v-card-title>
              <h4>
                Do you have more Vaccines available? You can add them down here
              </h4></v-card-title
            >
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="4">
                  <h5>
                    Number of vaccines you add:
                    
                  </h5>
                </v-col>
                <v-col cols="12" md="4">
                 <v-text-field
                          v-model="vaccines.doses"
                          label="Doses"
                        ></v-text-field>
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
            Yes
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
      addVaccinesDialog: false,
       vaccines:{
         doses:""
       }




  }),
  computed: {
    availableVaccines(){
      return this.$store.getters.availableVaccines;
    }
    

  },
  methods:{
    async getHospital() {
      try{
       let response = await this.$store.dispatch(
        "loadHospital",
        this.$store.state.auth.hospital.username
      );
      if(response) throw new Error()
      
      
        
      }

      catch(err){
        this.color2="#e17b58";
        this.snackbar2 = true;
        this.message=`Couldn't show this Hospital profile. An error occured during request (${err})`
      }


    },
    showAddVaccinesDialog(){
    this.addVaccinesDialog = true;
    },
    
    addVaccines(){
      console.log(this.vaccines.doses)
    }
      
    
  },
  
   mounted() {
    this.getHospital();
  }
};
</script>