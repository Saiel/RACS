<template>
  <div class="Table-Row">
    <div v-for="(value, field, idx) in schema" class="Table-Cell" :key="idx">
      {{ item[field] }}
    </div>
    <div class="Table-Cell">
      <Button v-if="withDelete" view-type="danger" @on-click="deleteItem">
        Удалить
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
.Table-Row {
  align-items: center;
  display: flex;
  border-bottom: 1px solid var(--color-table-divider);
  padding: calc(var(--content-padding-v) / 2) 0px;
  width: 100%;

  &:nth-child(2n) {
    background: var(--color-light);
  }
}
.Table-Header {
  border-bottom: 1px solid var(--color-content-divider);
}
.Table-Cell {
  width: 10%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Button from 'components/Button/Button.vue';

export default Vue.extend({
  name: 'TableRow',
  components: {
    Button,
  },
  methods: {
    deleteItem(event: Event) {
      this.$emit('on-delete', this.item[this.idField]);
    }
  },
  props: ['item', 'onDelete', 'schema', 'withDelete'],
  computed: {
    idField() {
      for (const [field, value] of Object.entries(this.schema)) {
        if (value === 'ID') return field;
      }
      return 'id';
    }
  },
});
</script>
