<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view></router-view>
    </v-main>
    <v-footer class="mt-8 mb-4" color="transparent">
      <v-row justify="center">
        {{ new Date().getFullYear() }} — <strong>SKG code - <v-icon> mdi-null</v-icon>Team Nu11s!</strong><v-icon> mdi-null</v-icon>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
<style>
.v-navigation-drawer {
  background-color: #2ac28e !important;
}
</style>
