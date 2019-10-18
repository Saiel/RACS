<script lang="ts">
import Vue from 'vue';

import { Log } from 'store/types';
import { LogSchema } from 'store/schema';

import { apiRequest, apiGetRequest, apiPostRequest, apiDeleteRequest } from 'api/apiRequest';

import Table from 'components/Table/Table.vue';
import Button from 'components/Button/Button.vue';

export default Vue.extend({
  name: 'Logs',
  components: {
    Table, Button
  },
  data() {
    return {
      requestOK: true,
      errorMsg: '',
      logs: [] as Array<Log>,
      dataSchema: LogSchema,
    }
  },
  mounted() {
    apiGetRequest('logs')
    .then((json) => {
      this.requestOK = true;
      this.logs = json.results;
    })
    .catch((err: Error) => {
      this.requestOK = false;
      this.errorMsg = err.message;
      this.logs = [];
    });
  }
});
</script>

<template>
  <div class="Logs">
    <div class="Logs-List">
      <h2>Журнал использования замков</h2>
      <Table v-if="requestOK" :withDelete="false" :items="logs" :schema="dataSchema"></Table>
      <div v-else>{{ errorMsg }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.Logs {
  display: flex;
  flex-wrap: wrap;

  &-List {
    width: 100%;
  }

  &-Table {
    width: 100%;
    margin-bottom: var(--content-padding-v);
  }

  &-Add {
    width: 100%;
  }

  .Table-Cell {
    &:nth-child(1) {
      width: 5%;
    }

    &:nth-child(2) {
      width: 15%;
    }

    &:nth-child(3) {
      width: 15%;
    }

    &:nth-child(4) {
      width: 15%;
      width: 15%;
    }
  }
}
</style>