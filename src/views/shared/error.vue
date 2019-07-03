<template>
  <b-container class="my-5 error-page px-md-0 px-4">
    <b-row class="justify-content-center">
      <b-col cols="12" lg="6">
        <h1 class="text-center error-code text-primary m-0">
          {{$route.params.id}}
        </h1>
        <h1 class="text-center">
          {{errorTitle}}
        </h1>
        <div class="text-center mt-2">
          <b-link :to="{name: 'home'}">
            Back to home
          </b-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        errorTitle: ''
      };
    },
    created() {
      const { id } = this.$route.params;
      if (id) {
        switch (Number(id)) {
          case 401:
            this.errorTitle = 'Please Sign in Again!';
            break;
          case 403:
            this.errorTitle = 'You haven\'t the necessary permissions for this page!';
            break;
          case 404:
            this.errorTitle = 'The page you are looking for not found';
            break;
          case 500:
            this.errorTitle = 'We have problem right now. please try again later!';
            break;
          default:
            this.errorTitle = 'There is some problems here. please try again...';
            break;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/scss/dependencies";
  @import "../../assets/scss/components/error";
</style>
