<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view></router-view>

      <v-footer class="mt-8 pa-4" color="transparent">
        <v-row justify="center">
          {{ new Date().getFullYear() }} —
          <strong>SKG code -Team Nu11s!</strong>
        </v-row>
      </v-footer>
    </v-main>
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
