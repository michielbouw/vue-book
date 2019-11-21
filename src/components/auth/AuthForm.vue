<template>
  <div>
    <div class="form">
      <input
        @input="inputEmail($event.target.value)"
        type="text"
        placeholder="Email"
        name="em"
      />
      <input
        v-if="!isForgotPassword"
        @input="inputPassword($event.target.value)"
        type="password"
        placeholder="Password"
        name="pw"
      />
      <input
        v-if="!isForgotPassword && isSignUp"
        @input="inputPassword2($event.target.value)"
        type="password"
        placeholder="Repeat password"
        name="pw2"
      />

      <button @click="submit">{{ buttonText }}</button>
    </div>

    <p v-if="error" class="error">
      <b>{{ error }}</b>
    </p>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'AuthForm',
  props: {
    isSignUp: Boolean,
    isForgotPassword: Boolean,
  },

  data() {
    return {
      email: '',
      password: '',
      password2: '',
      error: '',
    };
  },

  computed: {
    buttonText() {
      if (this.isSignUp) {
        return 'Sign up';
      } else if (this.isForgotPassword) {
        return 'Request new password';
      }
      return 'Sign in';
    },
  },

  methods: {
    inputEmail: _.debounce(function(value) {
      this.error = '';

      this.email = value;
    }, 500),

    inputPassword: _.debounce(function(value) {
      this.error = '';

      this.password = value;
    }, 500),

    inputPassword2: _.debounce(function(value) {
      this.error = '';

      this.password2 = value;
    }, 500),

    submit() {
      this.error = '';
      const { email, password, password2 } = this;

      if (this.isForgotPassword) {
        this.$emit('submit-form', email);
        return;
      }

      if (this.isSignUp && password !== password2) {
        this.error = 'Passwords do not match';
        return;
      }

      this.$emit('submit-form', { email, password });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding-top: 20px;
  width: 60%;

  input[type='text'],
  input[type='password'],
  button {
    width: 100%;
    margin: 0;
    margin-bottom: 16px;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    -moz-outline-style: none;
  }

  input[type='text'],
  input[type='password'] {
    border: 1px solid #bbb;
    font-size: 14px;
    padding: 0 8px;

    &:focus {
      border: 1px solid #3498db;
    }
  }

  button {
    background: #000000;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: 200;
    cursor: pointer;
    transition: box-shadow 0.4s ease;

    &:hover {
      box-shadow: 1px 1px 5px #555;
    }

    &:active {
      box-shadow: 1px 1px 7px #222;
    }
  }
}
</style>
