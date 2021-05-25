<template>
<v-container>
     <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
             {{title}}
            </h3>
            <h6 class="subtitle-2 font-weight-light">to this local hospital</h6>
            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center">
                <span class="info--text">
                  <v-img
                    v-bind:src="img"
                    width="80"
                  />
                </span>
                <h3 class="font-weight-regular align-self-center ml-4">{{number}}</h3>
              </div>
            </div>
          </v-card-text>
          <v-footer>
            <v-btn
            color="primary"
            small
            outlined
            rounded
          
            ><router-link v-bind:to="link"
                >{{btnLabel}}</router-link
              ></v-btn
            >
          </v-footer>
        </v-card>
       
</v-container>
</template>
<script>


export default {
  
  props: ["title", "img","link","btnLabel","number"]
  


  
};
</script>