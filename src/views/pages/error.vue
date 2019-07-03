<template>
  <div>
    {{ errorTitle }}
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        errorTitle: ''
      };
    },
    created() {
      this.fillErrorText();
    },
    methods: {
      /**
       * Fill error message
       */
      fillErrorText() {
        if (this.$route.params.id) {
          switch (parseInt(this.$route.params.id)) {
            case 401:
              this.errorTitle = 'لطفا دوباره وارد سیستم شوید!';
              break;
            case 403:
              this.errorTitle = 'شما اجازه دسترسی به این صفحه را ندارید!';
              break;
            case 404:
              this.errorTitle = 'صفحه مورد نظر یافت نشد!';
              break;
            case 410:
              this.errorTitle = 'حساب شما مسدود می باشد. لطفا با پشتیبانی تماس بگیرید!';
              break;
            case 500:
              this.errorTitle = 'با عرض پوزش، سیستم موقتا از دسترس خارج است!';
              break;
            case 503:
              this.errorTitle = 'با عرض پوزش، سایت در حال بروز رسانی است!';
              break;
            default:
              this.errorTitle = 'متاسفانه خطایی رخ داده است!';
              break;
          }
        }
      }
    }
  };
</script>
