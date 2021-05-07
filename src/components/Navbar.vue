<template>
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
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
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
      <v-toolbar-title v-else>Dashboard</v-toolbar-title>
      <div class="navbar-nav mr-auto mr-4">
        <li class="nav-item mr-1">
          <router-link to="home" class="nav-link" active-class="active" exact>
            <font-awesome-icon icon="home" />Home</router-link
          >
        </li>
        <li class="nav-item mr-1">
          <router-link
            v-if="currentUser"
            to="user"
            active-class="active"
            exact
            class="nav-link"
          >
            <font-awesome-icon icon="user" />User</router-link
          >
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item mr-1">
          <router-link
            to="register"
            active-class="active"
            exact
            class="nav-link"
          >
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item mr-1">
          <router-link to="login" active-class="active" exact class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
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
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item mr-1">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    currentView: "",
    selectItem: null,
    items: [
      { title: "Hospital View", icon: "mdi-home", to: "/user/profile" },
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
      { title: "Log Out", icon: "mdi-logout", to: "/user/login" },
    ],
  }),
};
</script>
<style  scoped>
.navbar-nav {
  flex-direction: row;
}
</style>
