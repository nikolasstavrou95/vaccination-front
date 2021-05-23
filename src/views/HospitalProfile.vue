<template>
  <v-container>
    
    <div class="col-left">
      
      <div class="image">
        <v-img src="/logo2.png" />
      </div>
    </div>
    <div class="col-right">
      <v-toolbar
      flat 
    >
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-toolbar>
      <div class="hospital-form">
        <h2 class="title">Hospital Information</h2>

        <h4>Hospital Name</h4>
        <v-text-field
          v-model="hospital.name"
          :error-messages="nameErrors"
          prepend-inner-icon="fas fa-user"
          required
          @input="$v.hospital.name.$touch()"
          @blur="$v.hospital.name.$touch()"
          name="name"
          :disabled="!isEditing"
        ></v-text-field>
        <h4>E-mail</h4>
        <v-text-field
          v-model="hospital.email"
          :error-messages="emailErrors"
          prepend-inner-icon="fas fa-at"
          required
          @input="$v.hospital.email.$touch()"
          @blur="$v.hospital.email.$touch()"
          name="email"
          :disabled="!isEditing"
        ></v-text-field>
        <h4>Address</h4>

        <v-text-field
          v-model="hospital.address"
          :error-messages="addressErrors"
          prepend-inner-icon="fas fa-map-marked-alt"
          required
          @input="$v.hospital.address.$touch()"
          @blur="$v.hospital.address.$touch()"
          name="address"
          :disabled="!isEditing"
        ></v-text-field>
        <h4>Phone number</h4>
        <v-text-field
          v-model="hospital.phone_number"
          :error-messages="phoneErrors"
          prepend-inner-icon="fas fa-map-marked-alt"
          required
          @input="$v.hospital.phone_number.$touch()"
          @blur="$v.hospital.phone_number.$touch()"
          name="address"
          :disabled="!isEditing"
        ></v-text-field>
        <h4>Username</h4>
        <v-text-field
          v-model="hospital.username"
          :error-messages="usernameErrors"
          prepend-inner-icon="fas fa-user"
          required
          @input="$v.hospital.username.$touch()"
          @blur="$v.hospital.username.$touch()"
          name="address"
          :disabled="!isEditing"
        ></v-text-field>

        <v-btn
          color="primary"
          small
          outlined
          rounded
          class="mt-4"
          @click="updateHospital"
          :disabled="!isEditing"
        >
          Update Hospital
        </v-btn>

        
      </div>
    </div>
    
  </v-container>
</template>



<script>

import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";
const containNumbers = helpers.regex("containNumbers", /\w\s\d+/);

export default {
  name: "Profile",
  mixins: [validationMixin],
  validations: {
    hospital: {
      name: { required },
      address: { required, containNumbers },
      city: { required },
      country: { required },

      phone_number: { required },
      username: { required },
      email: { required, email },
      password: { required },
    },
  },
  data() {
    return {
      isEditing: false,
      snackbar2: false,
      timeout2: 2000,
      message: "",
      color2:"",
     
      
    };
  },

  computed: {
    hospital(){
     return  this.$store.state.hospital.hospitalData;
     },
     
    

    nameErrors() {
      const errors = [];
      if (!this.$v.hospital.name.$dirty) return errors;

      !this.$v.hospital.name.required &&
        errors.push("Hospital's name is required");
      return errors;
    },
    usernameErrors(){
      const errors = [];
      if (!this.$v.hospital.username.$dirty) return errors;

      !this.$v.hospital.username.required &&
        errors.push("Hospital's username is required");
      return errors;

    },

    emailErrors() {
      const errors = [];
      if (!this.$v.hospital.email.$dirty) return errors;
      !this.$v.hospital.email.email &&
        errors.push("Please give a valid e-mail");
      !this.$v.hospital.email.required && errors.push("E-mail is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.hospital.address.$dirty) return errors;
      !this.$v.hospital.address.required && errors.push("Address is required");
      // test if there is a number in the address
      !this.$v.hospital.address.containNumbers &&
        errors.push("Address not contain numbers");

      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.hospital.phone_number.$dirty) return errors;

      !this.$v.hospital.phone_number.required &&
        errors.push("Phone is required.");
      return errors;
    },
  },
  methods: {
  
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
    async updateHospital() {
      var data = {
        id:this.hospital.id,
        name: this.hospital.name,
        address: this.hospital.address,
        email: this.hospital.email,
        phone_number: this.hospital.phone_number,
        city: this.hospital.city,
        country: this.hospital.country,
        username:this.hospital.username,
        password:this.hospital.password,
        private:this.hospital.private,
        public: this.hospital.public,
        vaccines: this.hospital.vaccines,
        roles:this.hospital.roles
        



      };
      try{
        
        let response = await this.$store.dispatch("editHospital", data);
        if(response){
          throw new Error()
        }
        this.color2 = "#2d9277"; 
        
        this.message = "Patient Edited Successfully";
        this.snackbar2 = true;

        
        this.getHospital();
        this.isEditing=!this.isEditing;

      } catch(err){
        this.color2="#e17b58";
        this.snackbar2 = true;
        this.message =`Couldn't update this Hospital profile. An error occured during update (${err})`;
        
       
   
    
      }

    },
  },
  mounted() {
    // this.error = "";
    this.getHospital();
  },
};
</script>
<style  scoped>
.container {
  max-width: 980px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
  box-shadow: 2px 5px 20px rgba(119, 119, 119, 0.5);
}
.col-left {
  flex-basis: 40%;
}
.col-right {
  flex-basis: 50%;
  justify-content: flex-end;
}
.image {
  margin: 100px auto;
}
.image {
  width: 210px;
  height: 210px;
}
.hospital-form {
  margin-top: 50px;
}
.hospital-form .title {
  margin-bottom: 30px;
}
@media screen and (max-width:600px){
  .container{

    flex-direction: column;
     height: auto;
     padding:30px;
     margin:0;
      box-shadow: none;
  }
  .image {
   display:none;
  }
  .hospital-form {
     margin-top: 10px;
  }
}
</style>