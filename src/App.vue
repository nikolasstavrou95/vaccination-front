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
