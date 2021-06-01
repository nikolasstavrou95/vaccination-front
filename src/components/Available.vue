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
      ...mapState({ status: (state) => state.auth.hospital.iAmAvailable})
    },
    methods:{
      async  changeStatus(){
                   
     await vaccinationsService.makeAvailable(this.$store.state.auth.hospital.username)
                    
        },
         initStatus(){
     if (this.$store.state.auth.hospital.iAmAvailable==true){this.switch1=true} }
    }

  }
</script>