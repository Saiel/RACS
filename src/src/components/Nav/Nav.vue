<template>
  <div class="Nav">
    <nav-item v-for="route in routes" :key="route.name" :link="route.path">{{ route.name }}</nav-item>
  </div>
</template>

<style lang="scss">
.Nav {
  display: flex;
  justify-content: space-between;
}
</style>

<script lang="ts">
import Vue from 'vue';

import pagesRoutes from 'routes';
import NavItem from './Nav-Item.vue';

export default Vue.extend({
  name: 'Nav',
  components: {
    NavItem,
  },
  data() {
    return {
      routes: pagesRoutes,
    };
  },
});
</script>