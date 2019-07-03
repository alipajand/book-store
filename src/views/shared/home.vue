<template>
  <div class="py-3 text-center">
    <h1 class="display-4 mt-5">
      <strong>
        WELCOME CITY!
      </strong>
    </h1>
    <h3>
      Join Us to use all features for free
    </h3>
    <div class="my-5">
      <b-button v-on:click="signUp"
                v-if="!$store.getters['auth/isLogin']">
        JOIN
      </b-button>

      <b-button :to="{name: 'books'}"
                v-if="!$store.getters['auth/isLogin']">
        Go In
      </b-button>
    </div>
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
