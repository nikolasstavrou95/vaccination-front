<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="4">
       
        <info-card :title="vaccinesCard.title" :img="vaccinesCard.image" :btnLabel="vaccinesCard.btnLabel" :link="vaccinesCard.link" :number="vaccinesCard.number"></info-card>
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
      number:"100",
      btnLabel:"ADD MORE",
      link:"/user/vaccinations"


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
    }



  }),
};
</script>