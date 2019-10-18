<template>
  <button :class="classString" @click="onClick">
    <slot />
  </button>
</template>

<style lang="scss">
.Button {
  border: 1px solid var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-m);
  padding: 5px 32px;

  &_type {
    &_ok {
      // background: var(--color-green);
    }

    &_danger {
      background: var(--color-red);
    }

    &_default {
      background: var(--color-light);
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Button',
  props: {
    viewType: {
      type: String,
      default: () => 'default',
    },
  },
  methods: {
    onClick(e: Event) {
      this.$emit('on-click', e);
    }
  },
  computed: {
    classString() {
      return `Button Button_type_${this.viewType}`;
    },
  },
});
</script>
