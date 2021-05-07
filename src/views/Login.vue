<template>
  <div class="col-md-12">
    <img class="side_wave" src="wave.png" />
    <div class="container">
      <div class="img">
        <img src="bg-image.svg" />
      </div>
      <div class="login">
        <form action="index.html">
          <img src="icons8-rod-of-asclepius-100.png" />
          <h2 class="title">Welcome</h2>
          <h3 class="message" v-if="submitStatus">
            {{ submitStatus }}
          </h3>

          <v-text-field
            v-model="hospital.username"
            :error-messages="usernameErrors"
            label="Username"
            required
            type="text"
            prepend-inner-icon="fas fa-user"
            name="username"
            @input="$v.hospital.username.$touch()"
            @blur="$v.hospital.username.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="hospital.password"
            :error-messages="passwordErrors"
            label="Password"
            prepend-inner-icon="fas fa-lock"
            type="password"
            name="password"
            @input="$v.hospital.password.$touch()"
            @blur="$v.hospital.password.$touch()"
          >
          </v-text-field>

          <v-btn rounded color="primary" @click="handleLogin" dark>
            Login
          </v-btn>
          <div>
            <h3>Not registered yet?</h3>
            <router-link class="left" to="/register"
              >click here to sign up 🔑</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Hospital from "../models/hospital";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    hospital: {
      username: { required },
      password: { required },
    },
  },

  data() {
    return {
      hospital: new Hospital("", ""),
      loading: false,
      message: "",
      submitStatus: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.hospital.username.$dirty) return errors;
      !this.$v.hospital.username.required &&
        errors.push("Username is required");
      return errors;
    },
    // emailErrors() {
    //   const errors = [];
    //   if (!this.$v.hospital.email.$dirty) return errors;
    //   !this.$v.hospital.email.email && errors.push("Must be valid e-mail");
    //   !this.$v.hospital.email.required && errors.push("E-mail is required");
    //   return errors;
    // },
    passwordErrors() {
      const errors = [];
      if (!this.$v.hospital.password.$dirty) return errors;

      !this.$v.hospital.password.required &&
        errors.push("Password is required.");
      return errors;
    },
  },
  // created() {
  //   if (this.loggedIn) {
  //     this.$router.push("/profile");
  //   }
  // },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.loading = false;
      } else {
        // do your submit logic here
        if (this.hospital.username && this.hospital.password) {
          this.$store.dispatch("auth/login", this.hospital).then(
            () => {
              this.$router.push({ path: "user" });

              this.cleanLogin();
            },
            (errors) => {
              this.loading = false;

              this.submitStatus =
                errors.response.data.status === 401
                  ? `💥 Wrong username or password, try again`
                  : ``;
              // (error.response && error.response.data) ||
              // error.message ||
              // error.toString();
            }
          );
        }
      }
    },
    cleanLogin() {
      this.hospital.email = "";
      this.hospital.password = "";
      this.submitStatus = "";
    },
  },
};
</script>

<style scoped>
</style>
