<template>
  <header>
    <div class="container">
      <span class="title">
        <router-link to="/" title="Navigate to main">
          <img alt="logo" :src="logoSrc" />
          <span>{{ title }}</span>
        </router-link>
      </span>

      <ul>
        <li v-if="!isLoggedIn">
          <router-link to="/sign-in">Sign in</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/sign-up">Sign up</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/admin" title="Navigate to the administation page"
            >Admin</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <a href="#" to="/" @click.prevent="signOut">Logout</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { signOut, isLoggedIn } from '../../services/authService';

export default {
  name: 'Header',
  props: {
    title: String,
    logoSrc: String,
  },

  computed: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },

  methods: {
    signOut() {
      signOut()
        .then(() => {
          window.location.href = '/';
        })
        .catch(() => {
          window.location.href = '/';
        });
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
      margin-left: 16px;
      padding: 0;
      display: inline;

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
