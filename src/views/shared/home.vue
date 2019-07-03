<template>
  <div class="py-3 text-center">
    <h1 class="display-4 mt-5">
      <strong>
        Welcome to Book City!
      </strong>
    </h1>
    <h1>
      Join Us to use all features for free
    </h1>
    <div class="my-5">
      <b-button size="lg"
                @click="signUp"
                v-if="!$store.getters['auth/isLogin']">
        JOIN
      </b-button>
      <b-button size="lg"
                :to="{name: 'books'}"
                v-else>
        {{ userInfo.name }} GO IN
      </b-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        userWin: {}
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'user/get'
      })
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
