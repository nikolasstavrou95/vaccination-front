<template>
  <v-container class="d-flex">
    <v-row class="align-center">
      <img class="side_wave" src="wave.png" />
      <v-col class="d-none d-md-flex justify-center align-center">
        <!-- <div class="container"> -->
        <div class="img"><img src="bg-image.svg" /></div>
      </v-col>
      <v-col>
        <div class="signup">
          <form>
            <img src="logo2.png" />
            <h2 class="title">Welcome to vaccination system</h2>

            <p v-if="message">{{ message }}</p>
            <div v-if="!successful">
              <p>Please fill the registration form</p>
              <v-text-field
                class="pt-4"
                v-model="hospital.name"
                :error-messages="nameErrors"
                label="Hospital Name"
                required
                prepend-inner-icon="far fa-hospital"
                @input="$v.hospital.name.$touch()"
                @blur="$v.hospital.name.$touch()"
              ></v-text-field>

              <v-text-field
                class="pt-4"
                v-model="hospital.address"
                :error-messages="addressErrors"
                label="Address"
                required
                prepend-inner-icon="fas fa-map-marker-alt"
                @input="$v.hospital.address.$touch()"
                @blur="$v.hospital.address.$touch()"
              ></v-text-field>
              <v-text-field
                class="pt-4"
                v-model="hospital.city"
                :error-messages="cityErrors"
                label="City"
                required
                prepend-inner-icon="fas fa-map-marker-alt"
                @input="$v.hospital.city.$touch()"
                @blur="$v.hospital.city.$touch()"
              ></v-text-field>
              <v-text-field
                class="pt-4"
                v-model="hospital.country"
                :error-messages="countryErrors"
                label="Country"
                required
                prepend-inner-icon="fas fa-map-marker-alt"
                @input="$v.hospital.country.$touch()"
                @blur="$v.hospital.country.$touch()"
              ></v-text-field>
              <v-text-field
                class="pt-4"
                v-model="hospital.phone_number"
                :error-messages="phoneErrors"
                label="Phone number"
                required
                prepend-inner-icon="fas fa-phone-alt"
                @input="$v.hospital.phone_number.$touch()"
                @blur="$v.hospital.phone_number.$touch()"
              ></v-text-field>
            
              <v-text-field
                class="pt-4"
                v-model="hospital.username"
                :error-messages="usernameErrors"
                label="Username"
                required
                prepend-inner-icon="far fa-user"
                @input="$v.hospital.username.$touch()"
                @blur="$v.hospital.username.$touch()"
              ></v-text-field>
              <v-text-field
                class="pt-4"
                v-model="hospital.email"
                :error-messages="emailErrors"
                label="Email"
                required
                prepend-inner-icon="fas fa-at"
                @input="$v.hospital.email.$touch()"
                @blur="$v.hospital.email.$touch()"
              ></v-text-field>
              <v-text-field
                class="pt-4"
                v-model="hospital.password"
                :error-messages="passwordErrors"
                label="Password"
                required
                prepend-inner-icon="fas fa-lock"
                @input="$v.hospital.password.$touch()"
                @blur="$v.hospital.password.$touch()"
              ></v-text-field>
              <v-btn
                rounded
                color="primary"
                v-if="!submitted"
                @click="handleRegister"
                dark
              >
                Register
              </v-btn>
            </div>
            <p class="error mt-2" v-if="errorMessage">{{ errorMessage }}</p>
          </form>
        </div>
      </v-col>
      <!-- </div> -->
    </v-row>
  </v-container>
</template>

<script>
import Hospital from "../models/hospital";
import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";
const containNumbers = helpers.regex("containNumbers", /\w\s\d+/);

export default {
  name: "Register",

  mixins: [validationMixin],
  validations: {
    hospital: {
      name: { required },
      address: { required, containNumbers },
      city: { required },
      country: { required },
      // available_doses: { required, minValue: minValue(0), integer },
      phone_number: { required },
      username: { required },
      email: { required, email },
      password: { required },
    },
  },
  data() {
    return {
      hospital: new Hospital("", "", "", "", "", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
      errorMessage: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.hospital.name.$dirty) return errors;

      !this.$v.hospital.name.required &&
        errors.push("Hospital's name is required");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.hospital.username.$dirty) return errors;

      !this.$v.hospital.username.required &&
        errors.push("Username is required");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.hospital.city.$dirty) return errors;

      !this.$v.hospital.city.required && errors.push("City is required");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.hospital.country.$dirty) return errors;

      !this.$v.hospital.country.required && errors.push("Country is required");
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.hospital.password.$dirty) return errors;

      !this.$v.hospital.password.required &&
        errors.push("Password is required.");
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.errorMessage = "";
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorMessage = "All the fields are required";
        this.successful = false;
        this.submitted = false;
      } else {
        this.$store.dispatch("auth/register", this.hospital).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            const loginData = { username: this.hospital.username,password: this.hospital.password}
            this.$store.dispatch("auth/login",loginData)
              .then(
            () => {
              
              this.$router.push({ path: "user" });

             } )
          }
          ,
          (error) => {
            this.errorMessage = `💥${error.response.data.message}`;
            this.submitted = false;
            this.successful = false;
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: indianred;
  font-size: large;
}
.side_wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: 0;
}


.img img {
  width: 500px;
}


.signup form {
  max-width: 780px;
  padding: 10px;
}
.signup img {
  height: 150px;
}



@media screen and (max-width: 1100px) {
  .side_wave {
    display: none;
  }
}

</style>
