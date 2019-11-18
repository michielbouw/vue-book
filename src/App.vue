<template>
  <div id="app">
    <div class="wrapper">
      <div class="start">
        <Header />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="end">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header';
import Footer from './components/common/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import './styles/base.scss';
</style>
