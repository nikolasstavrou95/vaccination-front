<template>
  <div id="app">
    <navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
//import Navbar from "../../authentication-app/src/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
