<template>
  <div id="app">
    <div class="wrapper">
      <div class="start">
        <Header
          :logoSrc="settings.mainHeaderLogo"
          :title="settings.mainHeaderTitle"
        />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="end">
        <Footer :content="settings.mainFooterContent" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },

  computed: mapState(['settings']),
};
</script>

<style lang="scss">
@import './styles/base.scss';
</style>
