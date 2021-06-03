 <template>

  <v-card
    class="mx-auto"
   
    
    height="100%"
  >
     <v-card-title class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
            Appointments to Transfer
            </h3>
                    
     </v-card-title>
<v-card-subtitle>
      <h6 class="subtitle-2 font-weight-light  ml-1">at other hospitals</h6>
      </v-card-subtitle>
    <v-card-text >
      <v-container>
             <v-row justify="center">
               <v-col cols="5" >
                  <v-img
                    src="/send.png"
                    width="80"
                    class="ml-14"
                  />
                </v-col>
                 
                 <v-col cols="6" >
               <h3 class="font-weight-regular align-self-center mt-6 ml-6">{{needTransfer}}</h3>
              </v-col>
            </v-row>
      </v-container>
     

        
    </v-card-text>

      
  </v-card>
 
</template>



<script>

import { mapState } from "vuex";
  export default {
    data () {
      return {
      
      
      }
    },
  mounted() {
      this.getHospital(),
 this.$store.dispatch('loadVaccinations', this.$store.state.auth.hospital.username)
 
 },
    computed:{ 
      ...mapState({ status: (state) => state.hospital.hospitalData.iAmAvailable}),
       needTransfer(){
      return this.$store.state.vaccinations.vaccinationsNeedTransfer
    },
    availability(){
      if (status===true){
          return "Available to receive tranfers"
      } else return "Not Available to receive tranfers "
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

  }
  }
</script>

<style scoped>
.v-card__actions{
  background:#c7cac9
}

</style>
  
      



<style scoped>

</style>