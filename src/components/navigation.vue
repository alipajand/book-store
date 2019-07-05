<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary" class="py-2">
      <b-container>
        <b-navbar-brand :to="{name: 'home'}">BSUP</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name: 'home'}" class="px-md-2">Home</b-nav-item>
            <b-nav-item :to="{name: 'books'}" class="px-md-2">Books</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto"
                        v-if="$store.getters['auth/isLogin']">
            <b-nav-item :to="{name: 'profile'}" class="px-md-2">Profile</b-nav-item>
            <b-nav-item @click="logout()" class="px-md-2">LogOut</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    methods: {
      async logout() {
        await this.$store.dispatch('auth/logout');

        /**
         * redirect to home page
         */
        this.$router.push({ name: 'home' });
      }
    }
  };
</script>
