<template>
  <div class="Header">
    <div class="Header-Logo"><h1 class="Typo Typo_h1">СКУД</h1></div>
    <Nav class="Header-Nav" />
  </div>
</template>

<style lang="scss">
.Header {
  align-items: center;
  background: var(--header-bg);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: space-between;
  padding: var(--content-padding-v) var(--content-padding-h);

  &-Logo, &-Nav {
    flex: 1;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Nav from 'components/Nav/Nav.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    Nav,
  },
});
</script>
