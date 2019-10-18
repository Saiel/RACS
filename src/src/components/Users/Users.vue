<script lang="ts">
import Vue from 'vue';

import { User, UserPOST } from 'store/types';
import { UserSchema } from 'store/schema';

import { apiRequest, apiGetRequest, apiPostRequest, apiDeleteRequest } from 'api/apiRequest';

import Table from 'components/Table/Table.vue';
import Button from 'components/Button/Button.vue';

export default Vue.extend({
  name: 'Users',
  components: {
    Table,
    Button,
  },
  data() {
    return {
      requestOK: true,
      errorMsg: '',
      users: [] as Array<User>,
      dataSchema: UserSchema,
      first_name: '',
      last_name: '',
      card_id: '',
      patronymic: '',
      email: '',
    };
  },
  methods: {
    getUsers() {
      apiGetRequest('users')
        .then((json) => {
          this.requestOK = true;
          this.users = json.results;
        })
        .catch((err: Error) => {
          this.requestOK = false;
          this.errorMsg = err.message;
          this.users = [];
        });
    },

    addUser(e: Event) {
      e.preventDefault();

      const data: UserPOST = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        patronymic: this.patronymic,
        card_id: this.card_id,
      };

      apiPostRequest('users', data)
        .then((response) => {
          console.log('Post resolved: ', response);
          this.getUsers();
        })
        .catch((error) => {
          console.log('Post rejected: ', error);
        });
    },

    deleteUser(id: number) {
      apiDeleteRequest('users', id)
        .then((json) => {
          console.log(json);
          this.getUsers();
        })
        .catch((error) => console.log('DELETE failed, ', error));
    },
  },
  mounted() {
    this.getUsers();
  },
});
</script>

<template>
  <div class="Users">
    <div class="Users-List">
      <h2>Список пользователей</h2>
      <Table
        v-if="requestOK"
        :withDelete="true"
        :items="users"
        :schema="dataSchema"
        @on-delete="deleteUser"
      ></Table>
      <div v-else>{{ errorMsg }}</div>
    </div>
    <div class="Users-Add">
      <h2>Новый пользователь</h2>
      <form class="Form">
        <input type="text" placeholder="Имя" v-model="first_name" />
        <input type="text" placeholder="Фамилия" v-model="last_name" />
        <input type="text" placeholder="Отчество" v-model="patronymic" />
        <input type="email" placeholder="E-mail" v-model="email" />
        <input type="text" placeholder="ID карточки" v-model="card_id" />
        <Button viewType="ok" @on-click="addUser">Добавить</Button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.Users {
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