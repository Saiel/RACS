<template>
  <div class="App">
    <Header />
    <router-view class="Page-Content" />
  </div>
</template>

<style lang="scss">
.App {
  background: #ffffff;
  min-height: 100vh;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Header from 'components/Header/Header.vue';
import 'components/Theme/Theme.scss';
import 'components/Page/Page.scss';
import 'components/Typo/Typo.scss';

const App = Vue.extend({
  name: 'App',
  components: {
    Header: Header,
  },
});

export default App;
</script>
