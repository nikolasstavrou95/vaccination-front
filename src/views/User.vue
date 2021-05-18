<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "user",

  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style>
</style>