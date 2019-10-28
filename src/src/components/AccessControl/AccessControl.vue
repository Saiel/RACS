<script lang="ts">
import Vue from 'vue';

import { User, UserPOST, LockAccess } from 'store/types';
import { LockAccessSchema } from 'store/schema';

import { apiRequest, apiGetRequest, apiPostRequest, apiDeleteRequest, APIResponses } from 'api/apiRequest';

import Table from 'components/Table/Table.vue';
import Button from 'components/Button/Button.vue';

export default Vue.extend({
  name: 'Users',
  components: {
    Table, Button
  },
  data() {
    return {
      requestOK: true,
      errorMsg: '',
      lockAccessList: [] as Array<LockAccess>,
      dataSchema: LockAccessSchema,
      access_start: '',
      access_stop: '',
      user: null,
      lock: null,
    }
  },
  methods: {
    addAccess(e: Event) {
      e.preventDefault();

      const { access_start, access_stop, user, lock } = this;

      if (user === null || lock === null) {
        alert('Необходимо заполнить все поля');
        return;
      }

      apiPostRequest('accesses', {
        access_start: new Date(this.access_start).toISOString(),
        access_stop: new Date(this.access_stop).toISOString(),
        lock: lock!,
        user: user!,
      })
      .then((json) => {
        console.log(json);
        this.requestOK = true;
        this.lockAccessList.push({
          lock: json.lock,
          user: json.user,
          access_start: json.access_start,
          access_stop: json.access_stop,
          card_id: json.card_id
        });
      })
      .catch((error) => {
        this.requestOK = false;
        this.errorMsg = error.message;
      });
    },
    deleteAccess(arg: any) {
      console.log(arg);
    }
  },
  mounted() {
    apiGetRequest('accesses')
    .then((json) => {
      this.requestOK = true;
      this.lockAccessList = json.results;
    })
    .catch((err: Error) => {
      this.requestOK = false;
      this.errorMsg = err.message;
      this.lockAccessList = [];
    });
  }
});
</script>

<template>
  <div class="AccessControl">
    <div class="AccessControl-List">
      <h2>Доступ к замкам</h2>
      <Table v-if="requestOK"  :withDelete="false" :items="lockAccessList" :schema="dataSchema" @on-delete="deleteAccess"></Table>
      <div v-else>{{ errorMsg }}</div>
    </div>
    <div class="AccessControl-Add">
      <h2>Добавить доступ</h2>
      <form class="Form">
        <input type="number" placeholder="ID Пользователя" v-model="user">
        <input type="string" placeholder="ID замка" v-model="lock" >
        <input type="datetime-local" placeholder="Начало доступа" v-model="access_start">
        <input type="datetime-local" placeholder="Окончание доступа" v-model="access_stop">
        <Button viewType="ok" @on-click="addAccess">Добавить</Button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.AccessControl {
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