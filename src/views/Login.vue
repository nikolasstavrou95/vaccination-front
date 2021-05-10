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
.error {
  color: indianred;
  font-size: large;
}
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

a.left {
  text-align: center;
  color: grey !important;
}

a.left:hover {
  color: #38d39f !important;
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
