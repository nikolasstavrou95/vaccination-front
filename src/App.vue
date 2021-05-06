<template>
  <div id="app">
    <header class="app-header">
      <nav class="mt-14">
        <v-navigation-drawer
          v-if="currentUser"
          v-model="drawer"
          app
          class="cyan white--text"
        >
          <v-list-item>
            <v-list-item-content class="pa-6">
              <v-list-item-title> Vaccinations </v-list-item-title>
              <v-list-item-subtitle>
                maybe app logo goes here
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              @click="currentView = item.title"
            >
              <v-list-item-icon>
                <v-icon class="pl-6">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app flat class="blue-grey lighten-3">
          <v-app-bar-nav-icon
            v-if="currentUser"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title v-if="!currentUser">Vaccination-app</v-toolbar-title>
          <v-toolbar-title v-else>{{ currentView }}</v-toolbar-title>
          <div class="navbar-nav mr-auto mr-4">
            <li class="nav-item mr-1 ml-2">
              <!-- <router-link
                v-if="!currentUser"
                to="home"
                class="nav-link"
                active-class="active"
                exact
              >
                <font-awesome-icon
                  icon="home"
                  style="color: #0f7452"
                />Home</router-link
              > -->
            </li>
          </div>
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item mr-2">
              <router-link
                to="register"
                active-class="active"
                exact
                class="nav-link"
              >
                <font-awesome-icon
                  icon="user-plus"
                  style="color: #0f7452"
                />Sign Up
              </router-link>
            </li>
            <li class="nav-item mr-1">
              <router-link
                to="login"
                active-class="active"
                exact
                class="nav-link"
              >
                <font-awesome-icon
                  icon="sign-in-alt"
                  style="color: #0f7452"
                />Login
              </router-link>
            </li>
          </div>

          <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item mr-1">
              <router-link
                to="profile"
                active-class="active"
                exact
                class="nav-link"
              >
                <font-awesome-icon icon="user" style="color: #0f7452" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item mr-1">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon
                  icon="sign-out-alt"
                  style="color: #0f7452"
                />LogOut
              </a>
            </li>
          </div>
        </v-app-bar>
      </nav>
    </header>

    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    currentView: "Dashboard",
    selectItem: null,

    items: [
      { title: "Dashboard", icon: "mdi-home", to: "/user/dashboard" },
      { title: "Patients", icon: "mdi-account-multiple", to: "/user/patients" },
      {
        title: "Vaccinations",
        icon: "mdi-clipboard-edit-outline",
        to: "/user/vaccinations",
      },
      {
        title: "Statistics",
        icon: "mdi-chart-areaspline",
        to: "/user/statistics",
      },
      { title: "Help", icon: "mdi-help-box", to: "/user/help" },
    ],
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.hospital;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.message {
  text-decoration: none;
  font-size: 500;
}
.navbar-nav {
  flex-direction: row !important;
}
.navbar-nav a {
  color: #0f7452;
}
.navbar-nav a:hover {
  color: #0b3528;
}
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
