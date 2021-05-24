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
      left
     
      
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar2 = false"> Close </v-btn>
      </template>
    </v-snackbar>
  
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
      




  }),
  computed: {
    availableVaccines(){
      const value = this.$store.hospital ? this.$store.getters.availableVaccines : ""
      return value;
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
    
    
  },
  
   mounted() {
    this.getHospital();
  }
};
</script>
