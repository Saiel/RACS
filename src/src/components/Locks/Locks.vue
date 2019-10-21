<script lang="ts">
import Vue from 'vue';

import { LockPOST, Lock } from 'store/types';
import { LockSchema } from 'store/schema';

import { apiRequest, apiGetRequest, apiPostRequest, apiDeleteRequest } from 'api/apiRequest';

import Table from 'components/Table/Table.vue';
import Button from 'components/Button/Button.vue';

export default Vue.extend({
  name: 'Locks',
  components: {
    Table, Button
  },
  data() {
    return {
      requestOK: true,
      errorMsg: '',
      locks: [] as Array<Lock>,
      dataSchema: LockSchema,
      description: '',
      version: '',
    }
  },
  methods: {
    getLocks() {
      apiGetRequest('locks')
    .then((json) => {
      this.requestOK = true;
      this.locks = json.results;
    })
    .catch((err: Error) => {
      this.requestOK = false;
      this.errorMsg = err.message;
      this.locks = [];
    });
    },

    addLock(e: Event) {
      e.preventDefault();

      const data: LockPOST = {
        description: this.description,
        version: this.version,
      }

      apiPostRequest('locks', data)
      .then((json) => {
        console.log(json);
        this.getLocks();
      })
      .catch((error: Error) => {
        console.log(error);
      })
    },

    deleteLock(id: number) {
      apiDeleteRequest('locks', id)
      .then((response) => {
        this.getLocks();
      })
      .catch((error: Error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getLocks();
  }
});
</script>

<template>
  <div class="Locks">
    <div class="Locks-List">
      <h2>Список замков</h2>
      <Table v-if="requestOK"  :with-delete="true" @on-delete="deleteLock" :items="locks" :schema="dataSchema"></Table>
      <div v-else>{{ errorMsg }}</div>
    </div>
    <div class="Lock-Add">
      <h2>Новый замок</h2>
      <form class="Form">
        <input type="text" placeholder="Описание" v-model="description">
        <input type="text" placeholder="Версия" v-model="version" >
        <Button viewType="ok" @on-click="addLock">Добавить</Button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.Locks {
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