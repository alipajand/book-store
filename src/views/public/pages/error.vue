<template>
  <div>
    <navigation-component v-bind:showSearch="false"
                          v-bind:margin="30">
    </navigation-component>

    <b-container class="my-5 errorPage px-md-0 px-4">
      <b-row class="justify-content-center py-5">
        <b-col cols="12" lg="6">
          <h1 class="text-center errorCode text-primary m-0">
            {{$route.params.id}}
          </h1>
          <h1 class="text-center">
            {{errorTitle}}
          </h1>
          <hr>
          <p class="mt-3 text-justify text-black-50 latin">
            {{$t('msg.error.errorStaticText')}}
          </p>
          <div class="text-center mt-4">
            <template v-if="$store.getters['auth/isLogin'] && $route.params.id !== 401">
              <b-link v-on:click.prevent="goToProfile()">
                بازگشت به پروفایل
              </b-link>
              <div class="m-2 d-inline">
                |
              </div>
            </template>
            <template v-else>
              <b-link v-bind:to="{name: 'home'}">
                بازگشت به صفحه اصلی
              </b-link>
              <div class="m-2 d-inline">
                |
              </div>
            </template>
            <b-link to="/contact">
              {{$t('msg.error.contactUs')}}
            </b-link>
            <div v-if="$route.params.id === 401"
                 class="m-2 d-inline">
              |
            </div>
            <b-link v-bind:to="generateLoginPage()"
                    v-if="$route.params.id === 401">
              {{$t('msg.error.loginPage')}}
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script type="text/javascript">
  import services from '../../../api';

  import globalMethods from '../../../methods';

  import navigationComponent from '../../shared/TheNavigation';

  export default {
    data() {
      return {
        ping: null,
        errorTitle: ''
      };
    },
    metaInfo() {
      return {
        title: `خطای ${this.$route.params.id}`,
        meta: [
          {
            vmid: 'og:title',
            content: `خطای ${this.$route.params.id}`
          }
        ]
      };
    },
    created() {
      this.fillErrorText();
      this.$notify({
        clean: true,
        group: 'axios'
      });

      /**
       * Token Expired or Token Black-listed
       */
      if (Number(this.$route.params.id) === 401) {
        this.$store.dispatch('auth/resetToken');
      }

      /**
       * retry to push user into main views
       */
      if (Number(this.$route.params.id) === 503) {
        this.ping = setInterval(() => {
          services.shared.ping().then(() => {
            this.$router.push({ name: 'home' });
          });
        }, 30000);
      }
    },
    beforeDestroy() {
      clearInterval(this.ping);
    },
    methods: {
      /**
       * check roles
       */
      generateLoginPage() {
        const role = globalMethods.getRole();
        if (role === globalMethods.premiumEmployer()) {
          return {
            name: 'premium-login',
            query: this.$route.query
          };
        }
        return {
          name: 'login',
          query: this.$route.query
        };
      },

      /**
       * Go to profile
       */
      goToProfile() {
        globalMethods.goToProfile({ router: this.$router });
      },

      /**
       * Fill error message
       */
      fillErrorText() {
        /**
         * props handling
         */
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
    },
    components: {
      navigationComponent
    }
  };
</script>

<style lang="scss">
  @import "../../../assets/scss/dependencies";
  @import "../../../assets/scss/components/error";
</style>
