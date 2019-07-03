<template>
  <div id="app">
    <router-view v-bind:key="$route.fullPath"/>
    <notifications position="center right" v-bind:duration="7000"/>
  </div>
</template>

<script type="text/javascript">
  export default {
    async created() {
      await this.$store.dispatch('user/get');
    }
  };
</script>
