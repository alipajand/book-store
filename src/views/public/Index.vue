<template>
  <div class="pb-5">
    <navigation-component v-bind:showSlogan="false"
                          v-bind:margin="30">
    </navigation-component>
    <router-view/>
    <footer-component v-bind:margin="30"></footer-component>
  </div>
</template>

<script type="text/javascript">
  import footerComponent from '../shared/TheFooter';
  import navigationComponent from '../shared/TheNavigation';

  export default {
    components: {
      footerComponent,
      navigationComponent
    }
  };
</script>
