<template>
  <header>
    <div class="container">
      <span class="title">
        <router-link to="/" title="Navigate to main">
          <img alt="logo" :src="settings.mainHeaderLogo" />
          <span>{{ settings.mainHeaderTitle }}</span>
        </router-link>
      </span>

      <ul>
        <li>
          <router-link to="/admin" title="Navigate to the administation page">
            Admin
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',

  computed: mapState(['settings']),

  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 50px;
  border-bottom: 1px solid #e3e3e3;

  .title {
    line-height: 50px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 16px;

    a {
      color: #000000;
      text-decoration: none;
    }

    img {
      height: 50px;
      vertical-align: bottom;
    }
  }

  ul {
    list-style-type: none;
    list-style-position: inside;
    -webkit-padding-start: 0;
    margin: 0;
    float: right;
    margin-right: 16px;

    li {
      margin: 0;
      padding: 0;

      a {
        line-height: 50px;

        color: #000000;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
