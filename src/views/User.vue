<template>
  <div>
    <img
      class="side_wave"
      v-if="currentRoute != 'Statistics'"
      src="/wave.png"
    />

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
.side_wave {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 100%;
  z-index: -2;
  transform: rotate(-90deg) translateX(-40%);
}
</style>