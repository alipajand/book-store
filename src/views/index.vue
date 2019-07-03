<template>
  <div>
    <navigation-component></navigation-component>
    <b-container>
      <router-view/>
    </b-container>
    <footer-component></footer-component>
  </div>
</template>

<script type="text/javascript">
  import navigationComponent from '../components/navigation';
  import footerComponent from '../components/footer';

  export default {
    components: {
      footerComponent,
      navigationComponent
    }
  };
</script>
