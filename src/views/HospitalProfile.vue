<template>
  <v-card loading outlined class="container">
    <div class="col-left">
      <div class="image">
        <img src="/icons8-rod-of-asclepius-100.png" />
      </div>
    </div>
    <div class="col-right">
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
        ></v-text-field>
        <h4>Phone number</h4>
        <v-text-field
          v-model="hospital.phone_number"
          :error-messages="addressErrors"
          prepend-inner-icon="fas fa-map-marked-alt"
          required
          @input="$v.hospital.phone_number.$touch()"
          @blur="$v.hospital.phone_number.$touch()"
          name="address"
        ></v-text-field>

        <v-btn color="success" dark small @click="updateHospital">
          Update Hospital
        </v-btn>
        <p class="mt-3" v-if="error">{{ error }}</p>
      </div>
    </div>
  </v-card>
</template>



<script>
import HospitalDataService from "../services/user.service";
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
      hospital: null,

      error: "",
    };
  },
  // computed: {
  //   currentUser() {
  //     return this.$store.state.auth.hospital;
  //   },
  // },
  // mounted() {
  //   HospitalDataService.getHospitalData(
  //     this.$store.state.auth.hospital.username
  //   )
  //     .then((response) => {
  //       this.hospital = response.data;
  //     })
  //     .catch((errors) => {
  //       this.error = `${errors.response.error}`;
  //     });
  // },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.hospital.name.$dirty) return errors;

      !this.$v.hospital.name.required &&
        errors.push("Hospital's name is required");
      return errors;
    },
    // dosesErrors() {
    //   const errors = [];
    //   if (!this.$v.hospital.available_doses.$dirty) return errors;
    //   !this.$v.hospital.available_doses.integer &&
    //     errors.push("Please give a valid number");
    //   !this.$v.hospital.available_doses.minValue &&
    //     errors.push("Please give a positive number");
    //   !this.$v.hospital.available_doses.required &&
    //     errors.push("Available doses is required");
    //   return errors;

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
    getHospital() {
      HospitalDataService.getHospitalData(
        this.$store.state.auth.hospital.username
      )
        .then((response) => {
          this.hospital = response.data;
        })
        .catch((errors) => {
          this.error = `${errors.response.error}`;
        });
    },

    updateHospital() {
      var data = {
        name: this.hospital.name,
        address: this.hospital.address,
        email: this.hospital.email,
        phone_number: this.hospital.phone_number,
        city: this.hospital.city,
        country: this.hospital.country,
      };

      HospitalDataService.update(this.hospital.username, data)
        .then(() => {
          this.getHospital();
          this.message = "Hospital profile was updated successfully!";
        })
        .catch((err) => {
          this.message = `Couldn't update this Hospital profile. An Error occured during update (${err})`;
        });
    },
  },
  mounted() {
    this.error = "";
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

  justify-content: center;
  align-content: center;
}
.col-right {
  flex-basis: 50%;
  justify-content: flex-end;
}
.image {
  margin: 50px auto;
}
.image img {
  width: 200px;
  height: 200px;
}
.hospital-form {
  margin-top: 50px;
}
.hospital-form .title {
  margin-bottom: 30px;
}
</style>