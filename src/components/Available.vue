<template>
  
    <v-switch
    color="cyan accent-2"
      inset
      v-model="switch1"
      inline
      @click="changeStatus"
    ></v-switch>
   

</template>

<script>
import vaccinationsService from "@/services/vaccinationsService.js";
import { mapState } from "vuex";
  export default {
    data () {
      return {
      switch1:null
      
      }
    },
  mounted() {
  this.initStatus()
  },
    computed:{ 
      ...mapState({ status: (state) => state.hospital.hospitalData.iAmAvailable})
    },
    methods:{
      async changeStatus(){
                   
         try{
           await vaccinationsService.makeAvailable(this.$store.state.auth.hospital.username)
         }catch(error){
           console.log(error)
         }
    },
    initStatus(){
    
        this.switch1=!status
    
    }

  }
  }
</script>