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
@import url('https://www.idean.com/static/fonts/TiemposTextWeb-Regular.woff2');

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Tiempos Text', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #000000;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-content: flex-start;

  /* We tell all items to be 100% width, via flex-basis */
  & > * {
    flex: 0 100%;
  }
}

.start {
  order: 1;
}
.main {
  order: 2;
  flex-grow: 1;
}
.end {
  order: 3;
  margin-top: 24px;
}

.container {
  margin: 0 auto;
  width: 90%;

  /* Large screens */
  @media all and (min-width: 800px) {
    width: 60%;
  }
}

.loading:after {
  content: ' .';
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: #000000;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 #000000, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 #000000, 0.5em 0 0 #000000;
  }
}

.small-text {
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
}
</style>
