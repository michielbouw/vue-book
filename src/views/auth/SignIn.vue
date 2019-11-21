<template>
  <div class="container">
    <h2>Sign in</h2>

    <AuthForm @submit-form="onSubmitSignIn" />

    <p v-if="error" class="error">
      <b>{{ error }}</b>
    </p>

    <p>
      <router-link to="/sign-up">Don't have an account? Sign up</router-link>
    </p>
  </div>
</template>

<script>
import AuthForm from '../../components/auth/AuthForm';

import { signIn } from '../../services/authService';

export default {
  name: 'SignIn',
  components: { AuthForm },

  data() {
    return {
      error: '',
    };
  },

  methods: {
    onSubmitSignIn({ email, password }) {
      this.error = '';

      signIn(email, password)
        .then(() => {
          window.location.href = '/';
        })
        .catch(() => {
          this.error =
            'Oops, it looks like you are not using the correct email or password.';
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
