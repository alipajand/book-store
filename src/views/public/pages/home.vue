<template>
  <div>
    <navigation-component></navigation-component>
    <section class="section home-company-list">
      <b-container>
        <vFlick class="home-link px-5"
                v-bind:options="flickityOptions"
                v-if="data.sharedPremiumCompanies && data.sharedPremiumCompanies.length !== 0">
          <b-col xl="2" lg="3" md="4"
                 class="carousel-cell text-center text-dark card-in mt-1 p-0"
                 v-for="company in data.sharedPremiumCompanies"
                 v-bind:key="company.id">
            <b-img class="rounded"
                   v-bind:alt="company.name"
                   v-bind:src="`/images/temp/${joinSpace(company.name)}.jpg`">
            </b-img>
            <!--<p class="mt-2 mb-0">-->
            <!--{{ company.name }}-->
            <!--</p>-->
          </b-col>
        </vFlick>
      </b-container>
    </section>
    <section class="section">
      <b-container class="home-job-offers mt-3">
        <b-row>
          <b-col xl="4" lg="6" cols="12">
            <b-card no-body class="mb-3">
              <div class="card-header pb-0">
                <b-row class="home-job-offers-title">
                  <b-col cols="8">
                    <h2 class="float-right text-white text-center bg-secondary mb-0">
                      {{$t('msg.public.home.jobsInTehran')}}
                    </h2>
                  </b-col>
                  <b-col cols="4" class="mt-4 text-center">
                    <b-link class="text-black-50"
                            v-bind:to="{name: 'jobs', query:{location: '119976c0-3eee-4182-842f-39b8afbe03d1'}}">
                      {{$t('msg.buttons.showAll')}}
                      <b-img-lazy src="/images/icons/go-left-arrow.png"
                                  width="8" class="ml-1" alt="سمت چپ">
                      </b-img-lazy>
                    </b-link>
                  </b-col>
                </b-row>
              </div>
              <div class="home-job-offer-body card-body p-2">
                <media-job-component v-bind:inputData="data.sharedJobsInCapital"
                                     v-if="data.sharedJobsInCapital && data.sharedJobsInCapital.length !== 0">
                </media-job-component>
                <loading-component class="v-center card-in"
                                   v-bind:show-text="false"
                                   v-else-if="flags.sharedJobsInCapitalLoading">
                </loading-component>
                <div class="media" v-else>
                  <small class="w-100 text-center my-3">
                    موردی یافت نشد!
                  </small>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col xl="4" lg="6" cols="12">
            <b-card no-body class="mb-3">
              <b-row class="home-job-offers-title">
                <b-col cols="8">
                  <h2 class="float-right text-white text-center bg-secondary mb-0">
                    {{$t('msg.public.home.jobsInProvinces')}}
                  </h2>
                </b-col>
                <b-col cols="4" class="mt-4 text-center">
                  <b-link v-bind:to="{name: 'jobs'}"
                          class="text-black-50">
                    {{$t('msg.buttons.showAll')}}
                    <b-img-lazy src="/images/icons/go-left-arrow.png" width="8"
                                class="ml-1" alt="برو به">
                    </b-img-lazy>
                  </b-link>
                </b-col>
              </b-row>
              <div class="home-job-offer-body card-body p-2">
                <media-job-component v-bind:inputData="data.sharedJobsInNoneCapital"
                                     v-if="data.sharedJobsInNoneCapital && data.sharedJobsInNoneCapital.length !== 0">
                </media-job-component>
                <loading-component class="v-center card-in"
                                   v-bind:show-text="false"
                                   v-else-if="flags.sharedJobsInNonCapitalLoading">
                </loading-component>
                <div class="media" v-else>
                  <small class="w-100 text-center my-3">
                    موردی یافت نشد!
                  </small>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col xl="4" lg="6" cols="12">
            <b-card no-body class="mb-3">
              <b-row class="home-job-offers-title">
                <b-col cols="8">
                  <h2 class="float-right text-white text-center bg-warning mb-0">
                    استخــــدام ویـــژه
                  </h2>
                </b-col>
                <b-col cols="4" class="mt-4 text-center">
                  <b-link v-bind:to="{name: 'jobs'}"
                          class="text-black-50">
                    {{$t('msg.buttons.showAll')}}
                    <b-img-lazy src="/images/icons/go-left-arrow.png" width="8"
                                class="ml-1"
                                alt="برو به">
                    </b-img-lazy>
                  </b-link>
                </b-col>
              </b-row>
              <div class="home-job-offer-body card-body p-2">
                <b-row class="justify-content-center text-center v-center card-in"
                       v-if="!flags.sharedJobsUrgentLoading && data.sharedJobsUrgent && data.sharedJobsUrgent.length === 0">
                  <b-col lg="8">
                    <b-img src="/images/icons/home-undraw-job.svg" fluid></b-img>
                  </b-col>
                </b-row>
                <media-job-component v-bind:inputData="data.sharedJobsUrgent"
                                     v-if="data.sharedJobsUrgent && data.sharedJobsUrgent.length !== 0">
                </media-job-component>
                <loading-component class="v-center card-in"
                                   v-bind:show-text="false"
                                   v-else-if="flags.sharedJobsUrgentLoading">
                </loading-component>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="section home-app-intro py-4 mt-4">
      <b-container>
        <b-row>
          <b-col md="3" cols="12" class="home-app-intro-iphone d-none d-lg-block">
            <b-img-lazy src="/images/icons/iphone.png" width="230"
                        alt="ویدوی آموزشی سه سوت جابز"></b-img-lazy>
            <div class="video-container">
              <video loop
                     controls
                     poster=''
                     autoplay
                     width="230px"
                     height="460px"
                     class="video-js vjs-default-skin"
                     data-setup='{ "aspectRatio":"464:848" }'>
                <source src="/videos/home-video.mp4" type='video/mp4'/>
              </video>
            </div>
          </b-col>
          <b-col lg="9" cols="12">
            <div class="home-app-intro-title mt-4 mb-2 text-white text-justify">
              {{$t('msg.public.home.appLink')}}:
            </div>
            <b-row>
              <b-col md="7"
                     cols="12"
                     v-if="appInfo.helpText === ''">
                <div class="input-group mt-5">
                  <b-form-input type="tel"
                                maxLength="11"
                                class="text-white"
                                autocomplete="off"
                                v-model="appPhoneNumber"
                                v-bind:placeholder="$t('msg.public.home.phoneNumberPlaceHolder')">
                  </b-form-input>
                  <span class="input-group-btn">
                                      <b-button type="button"
                                                variant="light"
                                                class="text-primary"
                                                v-bind:disabled="flags.appInfoLoading"
                                                v-on:click="sendAppLink(); gaSendEvent('main', 'send views links | button', 'home_page')">
                                        {{$t('msg.buttons.sendLink')}}
                                      </b-button>
                                    </span>
                </div>
              </b-col>
              <b-col cols="12"
                     v-else>
                <h3 class="mt-5 text-white my-2">
                  {{appInfo.helpText}}
                </h3>
              </b-col>
              <b-col cols="12"
                     class="home-download-app-link my-3"
                     v-if="$store.getters['storage/getApplicationLinks']">

                <b-link v-bind:href="$store.getters['storage/getApplicationLinks'].sibapp.url"
                        v-bind:title="$store.getters['storage/getApplicationLinks'].sibapp.name"
                        target="_blank"
                        rel="noopener"
                        v-on:click="gaSendEvent('main', 'download from sibapp | link', 'home_page')">
                  <b-img src="/images/icons/download-on-sibapp-dark.png"
                         fluid
                         width="170"
                         class="mb-2 rounded"
                         alt="دانلود از سیب اپ">
                  </b-img>
                </b-link>
                <b-link v-bind:href="$store.getters['storage/getApplicationLinks'].playstore.url"
                        v-bind:title="$store.getters['storage/getApplicationLinks'].playstore.name"
                        target="_blank"
                        rel="noopener"
                        v-on:click="gaSendEvent('main', 'download from google play | link', 'home_page')">
                  <b-img src="/images/icons/download-on-google-play-dark.png"
                         fluid
                         width="170"
                         class="mb-2 rounded"
                         alt="دانلود از کافه گوگل پلی">
                  </b-img>
                </b-link>
              </b-col>
            </b-row>
            <b-row class="my-4">
              <b-col cols="12">
                <b-link v-bind:to="{name: 'video'}"
                        class="home-show-video-link mt-5 mb-2 text-warning pointer"
                        v-on:click="gaSendEvent('main', 'go to video page | link', 'home_page')">
                  <b-img-lazy src="/images/icons/icon-play-video.png"
                              width="36"
                              alt="شروع">
                  </b-img-lazy>
                  {{$t('msg.public.home.showVideo')}}
                </b-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="section">
      <b-container class="home-jobs-list">
        <h1 class="text-center block mb-3">
          لیست فرصت‌های شغلی
        </h1>
        <p class="text-center block mb-5">
          برای مشاهده لیست فرصت‌های شغلی بر روی زمینه شغلی مدنظر خود کلیک کنید!
        </p>
        <b-row class="home-jobs-list-row">
          <template v-if="data.sharedJobCategories && data.sharedJobCategories.length !== 0">
            <b-col lg="3" md="6" cols="12"
                   v-for="(category, index) in data.sharedJobCategories"
                   v-bind:key="index">
              <b-card no-body
                      class="mb-3 text-center">
                <div class="card-body">
                  <b-link class="text-secondary"
                          v-on:click="gaSendEvent('main', 'go to category | link', 'home_page', category.name)"
                          v-bind:to="{name: 'jobs', query: {category: category.id}}">

                    <div class="d-block">
                      <b-img-lazy width="50"
                                  v-bind:src="`/images/categories/${category.id}.png`"
                                  v-bind:alt="`دسته‌بندی شغلی برای ${category.name}`">
                      </b-img-lazy>
                    </div>
                    <h2 class="mt-3 mb-0 text-secondary">
                      {{category.name}}
                    </h2>
                  </b-link>
                </div>
                <div class="card-footer border-0">
                  <h1 class="text-primary m-0">
                    {{category.jobs_count}}
                  </h1>
                </div>
              </b-card>
            </b-col>
            <b-col lg="3" md="6" cols="12">
              <b-card no-body
                      class="mb-3 text-center">
                <div class="card-body">
                  <b-link v-bind:to="{name: 'jobs'}" class="text-secondary"
                          v-on:click="gaSendEvent('main', 'go to category | link', 'home_page', 'همه فرصت‌های شغلی')">
                    <div class="d-block">
                      <b-img-lazy height="50" src="/images/icons/cat-show-all.png"
                                  alt="همه فرصت‌های شغلی">
                      </b-img-lazy>
                    </div>
                    <h2 class="mt-3 mb-0 text-secondary">
                      همه فرصت‌های شغلی
                    </h2>
                  </b-link>
                </div>
                <div class="card-footer border-0">
                  <h1 class="text-primary m-0">
                    {{ data.countAllJobs }}
                  </h1>
                </div>
              </b-card>
            </b-col>
          </template>
          <b-col cols="12" class="home-jobs-list-row text-center text-black-50 mb-2" v-else>
            <loading-component v-if="flags.sharedJobCategoriesLoading"
                               class="d-block">
            </loading-component>
            <div v-else>
              {{$t('msg.errorTexts.noJobAvailable')}}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="section home-statistic text-white"
             v-if="data.sharedBi">
      <b-container>
        <b-row>
          <b-col md="4" cols="12" class="text-center mb-5">
            <i class="fa fa-handshake mb-3"></i>
            <p class="mb-0">
              {{data.sharedBi.chat_rooms || 0}}+
            </p>
            <h1 class="text-center">
              {{$t('msg.public.home.linksBetweenCAEM')}}
            </h1>
          </b-col>
          <b-col md="4" cols="12" class="text-center mb-5">
            <i class="fa fa-briefcase mb-3"></i>
            <p class="mb-0">
              {{data.sharedBi.jobs || 0}}+
            </p>
            <h1 class="text-center">
              {{$t('msg.public.home.allIndexedJobs')}}
            </h1>
          </b-col>
          <b-col md="4" cols="12" class="text-center mb-5">
            <i class="fa fa-users mb-3"></i>
            <p class="mb-0">
              {{data.sharedBi.candidates || 0}}+
            </p>
            <h1 class="text-center">
              {{$t('msg.public.home.candidateRegistered')}}
            </h1>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="section">
      <b-container class="home-blog-list">
        <h1 class="text-center block mb-5 mt-4">
          {{$t('msg.public.home.blogTitle')}}
        </h1>

        <blog-card-component v-bind:data="data.blogPosts"
                             v-if="data.blogPosts && data.blogPosts.length !== 0">
        </blog-card-component>

        <b-row class="justify-content-center">
          <b-col md="4"
                 class="text-center text-black-50 mt-5"
                 v-if="data.blogPosts && data.blogPosts.length !== 0">
            <b-link class="btn btn-outline-primary btn-block show-all-blog"
                    v-bind:to="{name: 'blog'}"
                    v-on:click="gaSendEvent('main', 'show all blog posts | link', 'home_page')">
              مشاهده همه مطالب
            </b-link>
          </b-col>
          <loading-component v-else-if="flags.blogLoading"></loading-component>
          <b-col class="text-center"
                 v-else>
            {{$t('msg.errorTexts.noPost')}}
          </b-col>
        </b-row>
      </b-container>
    </section>
    <footer-component></footer-component>
  </div>
</template>

<script type="text/javascript">
  import services from '../../../api';
  import globalMethods from '../../../methods';
  import footerComponent from '../../shared/TheFooter';
  import mediaJobComponent from '../components/TheMediaCard';
  import navigationComponent from '../../shared/TheNavigation';
  import blogCardComponent from '../components/TheBlogCard';
  import vFlick from 'vue-flickity'; // https://github.com/drewjbartlett/vue-flickity

  export default {
    data: () => {
      return {
        appInfo: {
          helpText: '',
          phone_number: ''
        },
        data: {
          sharedBi: [],
          blogPosts: [],
          sharedJobsUrgent: [],
          sharedJobCategories: [],
          sharedJobsInCapital: [],
          sharedJobsInNoneCapital: [],
          sharedPremiumCompanies: [
            { name: 'اسنپ' },
            { name: 'تخفیفان' },
            { name: 'اگاه' },
            { name: 'فناپ' },
            { name: 'کاله' },
            { name: 'توسعه صنعتی ایران' },
            { name: 'سن ایچ' },
            { name: 'اپ' },
            { name: 'بیمه پاسارگاد' }
          ],
          countAllJobs: 0
        },
        flickityOptions: {
          autoPlay: 3000,
          friction: 0.2,
          draggable: '> 1',
          cellAlign: 'right',
          resize: true,
          pageDots: false,
          wrapAround: true,
          freeScroll: false,
          rightToLeft: true,
          prevNextButtons: true
        },
        flags: {
          appInfoLoading: false,
          sharedJobsUrgentLoading: false,
          sharedJobsInCapitalLoading: false,
          sharedJobCategoriesLoading: true,
          sharedJobsInNonCapitalLoading: false,
          sharedPremiumCompaniesLoading: false,
          blogLoading: false
        }
      };
    },
    computed: {
      appPhoneNumber: function () {
        return this.$store.getters['userInfo/getUserInfo'] ? this.removeWithPattern(this.$store.getters['userInfo/getUserInfo'].phone_number) : '';
      }
    },
    metaInfo() {
      return {
        title: '',
        meta: [
          {
            vmid: 'og:title',
            content: 'صفحه اصلی'
          },
          {
            vmid: 'description',
            content: 'استخدام در بهترین فرصت های شغلی و جذب مناسب ترین کارجویان در کوتاهترین زمان، در سراسر ایران ، بدون نیاز به رزومه. ثبت نام رایگان کارجو و کارفرما در تمامی زمینه های کاری و قابل استفاده برای تمامی کارجویان، شرکت ها و کسب و کارهای شخصی. با الگوریتم هوشمند تطبیق مشخصات شغل و جویای کار'
          },
          {
            vmid: 'og:description',
            content: 'استخدام در بهترین فرصت های شغلی و جذب مناسب ترین کارجویان در کوتاهترین زمان، در سراسر ایران ، بدون نیاز به رزومه. ثبت نام رایگان کارجو و کارفرما در تمامی زمینه های کاری و قابل استفاده برای تمامی کارجویان، شرکت ها و کسب و کارهای شخصی. با الگوریتم هوشمند تطبیق مشخصات شغل و جویای کار'
          }
        ]
      };
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        services.shared.getSharedBi().then(res => {
          this.data.sharedBi = res.data.data;
        }).catch(() => {
          console.log('failed getSharedBi');
        });

        /**
         * get recent jobs
         */
        this.flags.sharedJobsInCapitalLoading = true;
        services.shared.getSharedJobsInCapital().then(res => {
          this.data.sharedJobsInCapital = res.data.data;
          this.flags.sharedJobsInCapitalLoading = false;
        }).catch(() => {
          console.log('failed getSharedJobsInCapital');
          this.flags.sharedJobsInCapitalLoading = false;
        });

        this.flags.sharedJobsInNonCapitalLoading = true;
        services.shared.getSharedJobsInNonCapital().then(res => {
          this.data.sharedJobsInNoneCapital = res.data.data;
          this.flags.sharedJobsInNonCapitalLoading = false;
        }).catch(() => {
          console.log('failed getSharedJobsInNonCapital');
          this.flags.sharedJobsInNonCapitalLoading = false;
        });

        this.flags.sharedJobsUrgentLoading = true;
        services.shared.getSharedJobsPremium().then(res => {
          this.data.sharedJobsUrgent = res.data.data;
          this.flags.sharedJobsUrgentLoading = false;
        }).catch(() => {
          console.log('failed getSharedJobsInNonCapital');
          this.flags.sharedJobsUrgentLoading = false;
        });

        this.flags.blogLoading = true;
        services.shared.getSharedAllBlogPost('published').then(res => {
          this.flags.blogLoading = false;
          this.data.blogPosts = res.data.data.filter((post, index) => {
            return index < 6;
          });
        }).catch(() => {
          this.flags.blogLoading = false;
          console.log('failed getSharedBlogPost');
        });

        const jobCategory = this.$store.getters['jobCategories/get'];
        if (jobCategory && jobCategory.length === 0) {
          this.data.sharedJobCategories = await this.$store.dispatch('jobCategories/fetch');
          this.flags.sharedJobCategoriesLoading = false;
          this.data.countAllJobs = globalMethods.sumOfObjectProp(this.data.sharedJobCategories, 'jobs_count');
        }
      },
      /**
       * Send application link service
       */
      sendAppLink() {
        const regex = globalMethods.phoneNumberRegex();
        const phoneNumber = globalMethods.convertToEnglishDigit(this.appPhoneNumber);

        if (!regex.test(phoneNumber)) {
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

        const data = {
          phone_number: phoneNumber
        };

        this.flags.appInfoLoading = true;
        services.shared.sendAppLinks(data).then(() => {
          this.flags.appInfoLoading = false;
          this.appInfo.helpText = 'پیامکی حاوی لینک‌های دانلود اپلیکیشن برای شما ارسال شد!';
        }).catch(() => {
          this.flags.appInfoLoading = false;
          console.log('failed sendAppLinks');

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
      removeWithPattern(input) {
        return globalMethods.removeCountryCodeFromPhoneNumber(input);
      },
      findCompanyTypeName(input) {
        return globalMethods.findCompanyTypeName(input);
      }
    },
    components: {
      vFlick,
      footerComponent,
      mediaJobComponent,
      blogCardComponent,
      navigationComponent
    }
  };
</script>

<style lang="scss">
  @import "../../../assets/scss/dependencies";
  @import "../../../assets/scss/components/home";
  @import "../../../assets/scss/components/flickity";
</style>
