<template>
  <div id="app">
    <router-view v-bind:key="$route.fullPath"/>
    <notifications group="axios" position="center right" v-bind:speed="1000" v-bind:duration="7000"></notifications>
  </div>
</template>

<script type="text/javascript">
  export default {
    async created() {
      await this.$store.dispatch('user/get');
    }
  };
</script>
