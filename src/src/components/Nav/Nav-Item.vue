<template>
  <div class="Nav-Item">
    <router-link :to="link" class="Nav-Link">
      <slot></slot>
    </router-link>
  </div>
</template>

<style lang="scss">
.Nav-Item {
}

.Nav-Link {
  color: var(--color-accent);
  position: relative;
  text-decoration: none;

  &:after {
    background: var(--color-accent);
    content: ' ';
    width: 0px;
    height: 2px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    transition: all 0.15s ease-out;
  }

  &:hover:after {
    width: 100%;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Nav-Item',
  props: ['link'],
});
</script>