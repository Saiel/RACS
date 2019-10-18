<template>
  <div v-if="hasItems" class="Table">
    <div class="Table-Header Table-Row Typo Typo_l">
      <div v-for="field in schema" class="Table-Cell" :key="field">
        {{ field }}
      </div>
    </div>
    <TableRow :withDelete="withDelete" class="Typo Typo_m" v-for="item in items" :item="item" :key="item.id" @on-delete="deleteEntry" :schema="schema" />
  </div>
  <div v-else class="NoContent">
    Нет записей
  </div>
</template>

<style lang="scss">
.Table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &-Header {
    width: 100%;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import TableRow from './Table-Row.vue';

export default Vue.extend({
  name: 'Table',
  components: {
    TableRow,
  },
  props: ['items', 'schema', 'withDelete'],
  methods: {
    deleteEntry(id: number) {
      this.$emit('on-delete', id);
    },
  },
  computed: {
    hasItems() {
      return this.items.length > 0;
    }
  }
});
</script>
