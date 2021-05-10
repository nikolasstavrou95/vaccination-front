<template>
  <header class="app-header">
    <nav class="mt-14">
      <v-navigation-drawer
        v-if="currentUser"
        v-model="drawer"
        app
        class="cyan white--text"
      >
        <v-list-item>
          <v-list-item-content class="pa-6 justify-center">
            <!-- <v-list-item-title> Vaccinations </v-list-item-title> -->
            <v-list-item-subtitle>
              <v-img
                src="/icons8-rod-of-asclepius-100.png"
                max-width="120"
                height="120"
                class="m-auto"
              />
            </v-list-item-subtitle>
            <!-- <div>
              <p>{{ hospital.name }}</p>
              <p>{{ hospital.email }}</p>
              <p>{{ hospital.address }}</p>
              <p>{{ hospital.phone_number }}</p>
              <font-awesome-icon icon="user-edit" style="color: #0f7452" />
            </div> -->
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
              <font-awesome-icon icon="user-plus" style="color: #0f7452" />Sign
              Up
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
</template>
<script>
export default {
  data: () => ({
    name: "Navbar",
    drawer: null,
    currentView: "Dashboard",
    selectItem: null,
    hospital: "",
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
      { title: "Hospital View", icon: "mdi-home", to: "/user/profile" },
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
</style>


