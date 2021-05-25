<template>
  <v-container class="d-flex">
   <v-row class="top">
      <img class="side_wave" src="wave.png" />
      <v-col class="d-none d-md-flex justify-center align-center">
        <!-- <div class="container"> -->
        <div class="img"><img src="bg-image.svg" /></div>
      </v-col>
      <v-col class="d-xl-flex justify-center align-center">
      <div class="login">
        <form action="index.html">
          <img src="logo2.png" />
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
            @change="$v.hospital.username.$touch()"
            @click="cleanStatus"
          >
          </v-text-field>
          <v-text-field
            v-model="hospital.password"
            :error-messages="passwordErrors"
            label="Password"
            prepend-inner-icon="fas fa-lock"
            type="password"
            name="password"
             @change="$v.hospital.password.$touch()"
            @click="cleanStatus"
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
      </v-col>

  </v-row>
  </v-container>
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.hospital.password.$dirty) return errors;

      !this.$v.hospital.password.required &&
        errors.push("Password is required.");
      return errors;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ path: "profile" });
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "Please give username and password";
        this.loading = false;
      } else {
        // do your submit logic here
        if (this.hospital.username && this.hospital.password) {
          this.$store.dispatch("auth/login", this.hospital).then(
            () => {
             
              this.$router.push({ path: "user" });

              this.cleanLogin();
              this.cleanStatus();
            },
            (errors) => {
              this.loading = false;

              this.submitStatus =
                errors.response.data.status === 401
                  ? `💥 Wrong username or password, try again`
                  : ``;
            }
          );
        }
      }
    },
    cleanLogin() {
      this.hospital.email = "";
      this.hospital.password = "";
    },
    cleanStatus() {
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
  bottom: 0px;
  left: 0;
  height: 100%;
  z-index: 0;
}
.top{
  margin-top:130px;
}


.img {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.login
{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} 


.img img {
  width: 500px;
}

.login form {
  max-width: 780px;
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


@media screen and (max-width: 1100px) {
  .side_wave {
    display: none;
  }
}



@media screen and (max-width: 1000px) {
  
  .login h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

/* @media screen and (max-width: 900px) {
  

  .img {
    display: none;
  }

  
}*/
</style> 
