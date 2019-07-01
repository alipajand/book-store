<template>
  <div class="login-page ltr">
    <div class="rtl">
      <navigation-component v-bind:showSearch="false"
                            v-bind:margin="30">
      </navigation-component>
      <div class="login-bg-gradients-top">
        <b-container>
          <b-img-lazy src="/images/icons/login-logo-shape.png" width="290"
                      alt="login">
          </b-img-lazy>
        </b-container>
      </div>
      <b-container>
        <b-row class="justify-content-xl-start justify-content-center">
          <b-col md="auto">
            <div class="login-slogan mt-md-3 mt-3 mb-xl-5 text-center text-xl-right text-white card-in">
              {{$t('msg.public.login.topSlogan')}}
              <span class="bg-blue d-nowrap mt-xl-0 mt-4">
                {{$t('msg.public.login.onlineInterview')}}
              </span>
            </div>
          </b-col>
        </b-row>
        <template v-if="!flags.premium">
          <b-row class="login-container mt-md-5 mt-2 justify-content-center">
            <b-col xl="6" cols="12"
                   class="text-white mb-4 text-xl-right text-center"
                   v-if="!$route.params.data">
              <h1 class="mb-1 card-in">
                در سه سوت جابز می‌توانید:
              </h1>
              <ul class="mb-5 card-in p-0 list-unstyled">
                <li>
                  در کوتـــاه‌ترین زمـــان گزینه‌های منـــاسب خــود را مشـــاهده کنید
                </li>
                <li>
                  در بیش از ۲۸۰ شهر کشــور به جستجوی فرصت شغلی یا نیروی کار مناسب بپردازید
                </li>
                <li>
                  در هزینه‌های خود صرفــه جویی کنید
                </li>
                <li>
                  از پنل مدیریتی آسان بهــره‌مند شوید
                </li>
              </ul>
              <div class="card-in">
                <b-link v-bind:to="{name: 'signUp-employers'}"
                        class="btn btn-light text-info ml-sm-2 text-center mb-2">
                  {{$t('msg.public.login.hireBtn')}}
                </b-link>
                <b-link v-bind:to="{name: 'signUp-candidates'}"
                        class="btn btn-light text-info ml-sm-2 text-center mb-2">
                  {{$t('msg.public.login.hireSomeBodyBtn')}}
                </b-link>
              </div>
            </b-col>
            <b-col xl="6" lg="8" cols="12"
                   class="text-white mb-4 text-xl-right text-center"
                   v-else>
              <h1>
                {{$route.params.data.first_name}}
                عزیز،
              </h1>
              <h1 class="mb-4 text-justify">
                برای تکمیل ثبت‌نام، پیامکی حاوی کد تایید به شماره همراه شما ارسال شده است.
              </h1>
              <h4 class="text-justify">
                با وارد کردن کد تایید ارسال شده به شماره همراه شما، مراحل ثبت‌نام کامل خواهد شد.
                بلافاصله
                پس از ثبت نام می‌توانید نسبت به تکمیل یا ویرایش اطلاعات کاربری خود اقدام نمایید.
              </h4>
            </b-col>
            <b-col xl="5" lg="8" md="10" cols="12"
                   class="offset-xl-1 mt-xl-2 mb-4">
              <b-card class="login-form card-in">
                <b-form v-bind:class="flags.showSmsPanel ? '': 'disapear'">
                  <fieldset>
                    <legend class="mt-2 mb-4 pb-3">
                      {{$t('msg.public.login.loginToPanelTitle')}}
                    </legend>
                  </fieldset>
                  <b-form-group>
                    <b-form-input min="0"
                                  type="tel"
                                  maxLength="11"
                                  v-bind:autofocus="true"
                                  class="large ltr text-center"
                                  v-model.trim="model.phoneNumber"
                                  v-on:input="$v.model.phoneNumber.$touch"
                                  v-on:change="gaSendEvent('main', 'add phone_number | input', 'sign_in_form')"
                                  v-bind:state="$v.model.phoneNumber.$invalid && ($v.model.phoneNumber.$anyDirty || flags.errorOnSubmit) ? false : null"
                                  v-bind:readonly="!flags.showSmsPanel"
                                  v-bind:placeholder="$t('msg.public.login.phoneNumberPlaceholder')">
                    </b-form-input>
                    <b-form-invalid-feedback>
                      <div class="p-1 text-center">
                        تلفن همراه وارد شده معتبر نیست!
                      </div>
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group class="mb-5">
                    <b-button variant="info"
                              type="submit"
                              block class="border-0"
                              v-on:click.prevent="sendSMS()"
                              v-bind:disabled="flags.loading">
                      {{$t('msg.public.login.sendCodeBtn')}}
                    </b-button>
                  </b-form-group>
                </b-form>
                <b-form v-bind:class="flags.showLoginPanel ? '': 'disapear'"
                        v-on:submit.prevent="loginWithPhoneNumber()">
                  <fieldset>
                    <legend class="mt-2 mb-4 pb-3">
                      {{$t('msg.public.login.putCodeTitle')}}
                    </legend>
                  </fieldset>
                  <b-form-group>
                    <b-form-input min="0"
                                  type="tel"
                                  maxlength="6"
                                  autocomplete="off"
                                  class="text-center ltr large"
                                  v-on:input="$v.model.confirmationCode.$touch"
                                  v-on:change="gaSendEvent('main', 'add phone_number | input', 'sign_in_form')"
                                  v-bind:state="$v.model.confirmationCode.$invalid && ($v.model.confirmationCode.$anyDirty || flags.errorOnSubmit) ? false : null"
                                  v-bind:placeholder="$t('msg.public.login.confirmationCodePlaceholder')"
                                  v-model.trim="model.confirmationCode">
                    </b-form-input>
                    <b-form-invalid-feedback>
                      <div class="p-1 text-center">
                        کد وارد شده معتبر نیست!
                      </div>
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group>
                    <b-button type="button"
                              block
                              variant="info"
                              class="border-0"
                              v-on:click.prevent="loginWithPhoneNumber()"
                              v-bind:disabled="flags.loading">
                      {{$t('msg.public.login.loginBtn')}}
                    </b-button>
                  </b-form-group>
                  <b-row class="justify-content-sm-start justify-content-center">
                    <b-col cols="auto" class="mb-1">
                      <small>
                        شماره همراه:
                        <div class="d-inline text-dark">
                          {{model.phoneNumber}}
                        </div>
                      </small>
                      <small class="text-info ml-2 pointer"
                             v-on:click="changePhoneNumber()"
                             v-if="!$route.params.data">
                        تغییر
                      </small>
                      <small v-on:click="sendSMS()"
                             class="pointer d-inline text-info"
                             v-if="!flags.showTimer">
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        ارسال مجدد پیامک؟
                      </small>
                    </b-col>
                  </b-row>
                  <b-row class="justify-content-sm-end justify-content-center">
                    <b-col cols="auto">
                      <countdown-component v-bind:timerLength="60000"
                                           v-if="flags.showTimer"
                                           v-on:timeLeft="timeLeft($event)">
                      </countdown-component>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <premium-login-component></premium-login-component>
        </template>
      </b-container>
      <footer-component v-bind:show-links="false"
                        v-bind:show-subscribe="false">
      </footer-component>
    </div>
  </div>
</template>

<script type="text/javascript">
  import services from '../../../api';

  import globalMethods from '../../../methods';

  import footerComponent from '../../shared/TheFooter';
  import countdownComponent from '../../shared/TheTimer';
  import navigationComponent from '../../shared/TheNavigation';

  import premiumLoginComponent from '../../private/premium/shared/TheLoginComponent';

  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        model: {
          phoneNumber: '',
          confirmationCode: ''
        },
        flags: {
          retry: true,
          loading: false,
          showTimer: false,
          showSmsPanel: true,
          showLoginPanel: false,
          errorOnSubmit: false,
          premium: false
        }
      };
    },
    metaInfo() {
      return {
        title: 'ورود',
        meta: [
          {
            vmid: 'og:title',
            content: 'ورود'
          },
          {
            vmid: 'description',
            content: 'در صورتی که قبلا حساب کاربری خود را ایجاد نموده اید وارد حساب کاربری خود شوید.'
          },
          {
            vmid: 'og:description',
            content: 'در صورتی که قبلا حساب کاربری خود را ایجاد نموده اید وارد حساب کاربری خود شوید.'
          }
        ]
      };
    },
    created() {
      /**
       * Check premium sub domain and redirect to it's profile
       */
      globalMethods.checkPremiumRole(this.$router, this.$route.query);

      /**
       * find best login template
       */
      if (globalMethods.checkPremiumDomain()) {
        this.flags.premium = true;
      }

      if (this.$route.params.data) {
        /**
         * If redirected from signup page
         */
        this.model.phoneNumber = this.$route.params.data.phone_number;
        this.sendSMS();

        /**
         * show Help Page Flag
         */
        globalMethods.setHelpPageFlag();
      } else {
        /**
         * reset token
         */
        this.$store.dispatch('auth/resetToken');
      }

      /**
       * Fix width of the shape in footer
       */
      this.addTriangleWidth();

      /**
       * $notify notification to user
       * remove all notifications
       */
      this.$notify({
        group: 'axios',
        clean: true
      });
    },
    mounted() {
      /**
       * on resizing the window
       */
      $(window).on('resize', () => {
        this.addTriangleWidth();
      });
    },
    methods: {
      /**
       * check timer's panel
       */
      timeLeft(time) {
        if (time === '00:00') {
          this.flags.showTimer = false;
        }
      },
      addTriangleWidth() {
        let getWindowWidth = $(window).outerWidth();
        $('.login-bottom-triangle').css({
          'border-right-width': getWindowWidth + 'px'
        });
      },

      /**
       * try to change phone_number
       */
      changePhoneNumber() {
        this.model.confirmationCode = '';
        this.flags.showTimer = false;
        this.flags.showSmsPanel = true;
        this.flags.errorOnSubmit = false;
        this.flags.showLoginPanel = false;
      },

      /**
       * services
       */
      sendSMS() {
        const regex = globalMethods.phoneNumberRegex();
        const phoneNumber = globalMethods.convertToEnglishDigit(this.model.phoneNumber);

        /**
         * if the phone_number is correct
         */
        if (!regex.test(phoneNumber)) {
          /**
           * Show all errors
           */
          this.flags.errorOnSubmit = true;

          /**
           * $notify notification to user
           */
          this.$notify({
            clean: true,
            group: 'axios'
          });

          /**
           * $notify notification to user
           */
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: 'تلفن همراه وارد شده اشتباه است!'
          });
          return;
        }

        /**
         * reset loading
         */
        this.flags.loading = true;
        this.flags.errorOnSubmit = false;

        /**
         * isSignUpProcess means redirected form signUp page to complete registration
         * we should'nt reset the token if redirected from signUp page
         */
        let isSignUpProcess = true;
        if (!this.$route.params.data) {
          isSignUpProcess = false;

          if (globalMethods.getCurrentToken()) {
            this.$store.dispatch('auth/resetToken');
          }
        }

        services.shared.sendSMS(phoneNumber, isSignUpProcess).then(() => {
          this.flags.loading = false;
          this.flags.showTimer = true;
          this.flags.showSmsPanel = false;
          this.flags.showLoginPanel = true;
          this.flags.errorOnSubmit = false;
        }).catch(err => {
          this.flags.loading = false;
          console.log('failed sendSMS');

          if (!err.response) {
            return;
          }
          this.gaSendEvent('main', 'login_error', `sendSMS --> ${phoneNumber} --> ${err.response.status}`);

          /**
           * Account Not Available (User is Blocked)
           */
          if (err.response.status === 410) {
            this.$router.push({
              name: 'error',
              params: {
                id: '410'
              }
            });
            return;
          }

          /**
           * $notify notification to user
           */
          this.$notify({
            group: 'axios',
            clean: true
          });

          /**
           * $notify notification to user
           */
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: 'متاسفانه خطایی رخ داده است. لطفا دوباره تلاش کنید!'
          });
        });
      },
      loginWithPhoneNumber() {
        const regex = RegExp(/^[1-9][0-9]*$/);
        const phoneNumber = globalMethods.convertToEnglishDigit(this.model.phoneNumber);
        const confirmationCode = globalMethods.convertToEnglishDigit(this.model.confirmationCode);

        /**
         * if the confirmation code is not correct
         */
        if (!regex.test(confirmationCode)) {
          /**
           * Show all errors
           */
          this.flags.errorOnSubmit = true;

          /**
           * $notify notification to user
           */
          this.$notify({
            group: 'axios',
            clean: true
          });

          /**
           * $notify notification to user
           */
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: 'کد تایید وارد شده اشتباه است!'
          });
          return;
        }

        /**
         * reset timer
         */
        this.flags.showTimer = false;
        this.flags.errorOnSubmit = false;

        /**
         * check confirmation number
         */
        if (this.model.confirmationCode && this.model.confirmationCode.length === 6) {
          /**
           * reset loading
           */
          this.flags.loading = true;

          /**
           * send data
           */
          services.shared.loginWithPhoneNumber(phoneNumber, confirmationCode).then(() => {
            this.flags.loading = false;

            /**
             * Role checker
             */
            const userRole = globalMethods.getRole();
            if (userRole === 'anonymous' || userRole === 'auth' || userRole === 'guest') {
              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                clean: true
              });

              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                type: 'danger',
                text: 'این شماره قبلا ثبت نام نشده است. لطفا ابتدا ثبت نام کنید!'
              });
              return;
            }

            /**
             * If the account is available then redirect to profile
             */
            const { returnUrl } = this.$route.query;
            if (returnUrl) {
              window.location.href = returnUrl;
            } else {
              const body = {
                router: this.$router,
                notify: this.$notify
              };
              globalMethods.goToProfile(body);
            }
          }).catch(err => {
            this.flags.loading = false;
            console.log('failed loginWithPhoneNumber');

            if (!err.response) {
              return;
            }
            this.gaSendEvent('main', 'login_error', `loginWithPhoneNumber --> ${phoneNumber} --> ${confirmationCode} --> ${err.response.status}`);

            /**
             * Confirmation Code Mismatched
             */
            if (err.response.status === 417 || err.response.status === 422) {
              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                clean: true
              });

              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                type: 'danger',
                text: 'کد وارد شده نامعتبر است!'
              });
            } else if (err.response.status === 401 && this.flags.retry) {
              this.sendSMS();
              this.loginWithPhoneNumber();

              this.flags.retry = false;
            } else {
              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                clean: true
              });

              /**
               * $notify notification to user
               */
              this.$notify({
                group: 'axios',
                type: 'danger',
                text: globalMethods.loginErrorTexts(err.response)
              });
            }
          });
        }
      }
    },
    validations: {
      model: {
        phoneNumber: {
          required,
          minLength: minLength(11)
        },
        confirmationCode: {
          required,
          minLength: minLength(6)
        }
      }
    },
    components: {
      footerComponent,
      countdownComponent,
      navigationComponent,
      premiumLoginComponent
    }
  };
</script>

<style lang="scss">
  @import "../../../assets/scss/dependencies";
  @import "../../../assets/scss/components/login";
</style>
