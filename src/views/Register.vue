<template>
  <div class="col-md-12">
    <img class="side_wave" src="wave.png" />
    <div class="container">
      <div class="img"><img src="bg-image.svg" /></div>
      <div class="signup">
        <form>
          <img src="icons8-rod-of-asclepius-100.png" />
          <h2 class="title">Welcome to vaccination system</h2>
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
            v-model="hospital.phone"
            :error-messages="phoneErrors"
            label="Phone number"
            required
            prepend-inner-icon="fas fa-phone-alt"
            @input="$v.hospital.phone.$touch()"
            @blur="$v.hospital.phone.$touch()"
          ></v-text-field>
          <v-text-field
            class="pt-4"
            v-model="hospital.doses"
            :error-messages="dosesErrors"
            label="Available doses"
            required
            prepend-inner-icon="fas fa-crutch"
            name="doses"
            @input="$v.hospital.doses.$touch()"
            @blur="$v.hospital.doses.$touch()"
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
            success
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
          <p v-if="message">{{ message }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Hospital from "../models/hospital";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minValue,
  integer,
  helpers,
} from "vuelidate/lib/validators";
const containNumbers = helpers.regex("containNumbers", /\w\s\d+/);

export default {
  name: "Register",

  mixins: [validationMixin],
  validations: {
    hospital: {
      name: { required },
      address: { required, containNumbers },
      doses: { required, minValue: minValue(0), integer },
      phone: { required },
      email: { required, email },
      password: { required },
    },
  },
  data() {
    return {
      hospital: new Hospital("", "", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
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
    dosesErrors() {
      const errors = [];
      if (!this.$v.hospital.doses.$dirty) return errors;
      !this.$v.hospital.doses.integer &&
        errors.push("Please give a valid number");
      !this.$v.hospital.doses.minValue &&
        errors.push("Please give a positive number");
      !this.$v.hospital.doses.required &&
        errors.push("Available doses is required");
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
      if (!this.$v.hospital.phone.$dirty) return errors;

      !this.$v.hospital.phone.required && errors.push("Phone is required.");
      return errors;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.successful = false;
        this.submitted = false;
      } else {
        this.$store.dispatch("auth/register", this.hospital).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
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
.side_wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login,
.signup {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}
.signup {
  margin-top: 70px;
}

.img img {
  width: 500px;
}

.login form {
  width: 360px;
}
.signup form {
  max-width: 780px;
  padding: 10px;
}
.login img {
  height: 100px;
}

.login h2 {
  margin: 15px 0;
  color: var(--black);
  text-transform: uppercase;
  font-size: 2.9rem;
}
.login h3 {
  color: rgb(66, 66, 66);
  text-decoration: underline;
  font-size: 1rem;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
a.left {
  text-align: center;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(
    to right,
    var(--light-blue),
    var(--baby-blue),
    var(--blue)
  );
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}
@media screen and (max-width: 1100px) {
  .side_wave {
    display: none;
  }
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .login h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .login,
  .signup {
    justify-content: center;
  }
}
</style>
