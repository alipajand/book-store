<template>
  <div class="py-3">
    WELCOME BODY
    <b-button v-on:click="signUp"
              v-if="!$store.getters['auth/isLogin']">
      Sign Up
    </b-button>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        userWin: {}
      };
    },
    methods: {
      signUp() {
        this.userWin = window.open('');
        this.userWin.location.href = 'http://hiring.bsup.tk/oauth/authorize/?client_id=43&redirect_uri=http://localhost:8080&response_type=token';
        this.userWin.focus();
      }
    }
  };
</script>
