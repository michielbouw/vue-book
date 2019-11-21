<template>
  <div class="container">
    <h2>Sign up</h2>

    <AuthForm isSignUp @submit-form="onSubmitSignUp" />

    <p v-if="error" class="error">
      <b>{{ error }}</b>
    </p>

    <p>
      <router-link to="/sign-in">Go back to Sign in</router-link>
    </p>
  </div>
</template>

<script>
import AuthForm from '../../components/auth/AuthForm';

import { signUp } from '../../services/authService';

export default {
  name: 'SignUp',
  components: { AuthForm },

  data() {
    return {
      error: '',
    };
  },

  methods: {
    onSubmitSignUp({ email, password }) {
      this.error = '';

      signUp(email, password)
        .then(() => {
          this.$router.push('/sign-in');
        })
        .catch(error => {
          const errorCode = error.code;

          if (errorCode === 'auth/weak-password') {
            this.error = 'The password is too weak.';
          } else if (
            errorCode === 'auth/email-already-in-use' ||
            errorCode === 'auth/operation-not-allowed'
          ) {
            this.error =
              'Oops, looks like you are not allowed to do this, please try again later.';
          } else {
            this.error = error.message;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
