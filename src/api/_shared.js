import axios from 'axios';
import store from '../store/';
import globalMethods from '../methods';

export default {
  refreshToken: () => {
    return axios({
      method: 'POST',
      url: '/auth/refresh/',
      data: null,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fa-IR'
      }
    });
  },
  ping: () => {
    return axios({
      method: 'HEAD',
      url: '/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobCategories: () => {
    return axios({
      method: 'GET',
      url: '/shared/job-category/?include=jobs_count',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobCategoriesFunctions: () => {
    return axios({
      method: 'GET',
      url: '/shared/job-category/?include=job_functions',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobFunctions: () => {
    return axios({
      method: 'GET',
      url: '/shared/job-function/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getJobCategories: () => {
    return axios({
      method: 'GET',
      url: '/job-category/?include=job_functions.job_skills',
      data: {}
    });
  },
  getJobFunctions: (categories, page = 1) => {
    let url = `/job-function/?page=${page}`;
    if (categories) {
      url += `&of=${categories}`;
    }
    return axios({
      method: 'GET',
      url: url,
      data: {}
    });
  },
  getJobSkills: (functions, page = 1) => {
    return axios({
      method: 'GET',
      url: `/job-skill/?of=${functions}&page=${page}`,
      data: {}
    });
  },
  getSharedJobs: (body, page = 1, requestId) => {
    return axios({
      method: 'POST',
      url: `/shared/job/?page=${page}`,
      data: body,
      headers: {
        'sendAuth': false
      },
      requestId: requestId
    });
  },
  getSharedJobsInCapital: () => {
    return axios({
      method: 'GET',
      url: '/shared/job/capital/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobsInNonCapital: () => {
    return axios({
      method: 'GET',
      url: '/shared/job/non-capital/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobsPremium: () => {
    return axios({
      method: 'GET',
      url: '/shared/job/premium/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedLocation: (filter, id) => {
    let url = '/shared/location/';
    if (filter) {
      url += `?filter=${filter}`;
    }
    if (id) {
      url += `?only=${id}`;
    }
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedWorkTypes: () => {
    return axios({
      method: 'GET',
      url: '/shared/work-types/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedJobDetail: jobId => {
    return axios({
      method: 'GET',
      url: `/shared/job/${jobId}`,
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedAllBlogPost: (sort, page = 1) => {
    return axios({
      method: 'GET',
      url: `/shared/blog/post/?page=${page}&sort=${sort}`,
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedBlogPost: blogId => {
    return axios({
      method: 'GET',
      url: `/shared/blog/post/${blogId}`,
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSharedBi: () => {
    return axios({
      method: 'GET',
      url: '/shared/bi',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getApplicationLinks: () => {
    return axios({
      method: 'GET',
      url: '/app/store/links',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  getSocialMediaLinks: () => {
    return axios({
      method: 'GET',
      url: '/app/social/links',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  sendAppLinks: body => {
    return axios({
      method: 'POST',
      url: '/shared/notify/app-info/',
      data: body,
      headers: {
        'sendAuth': false
      }
    });
  },
  subscribeToNewsletter: body => {
    return axios({
      method: 'PATCH',
      url: '/shared/notify/newsletter/subscribe/',
      data: body,
      headers: {
        'sendAuth': false
      }
    });
  },
  viewAnalytics: body => {
    return axios({
      method: 'PATCH',
      url: '/analytics/increment/',
      data: body
    });
  },
  getAvailableCities: (filter, id) => {
    let url = '/location/';
    if (filter) {
      url = `/location/?filter=${filter}`;
    }
    if (id) {
      url = `/location/?only=${id}`;
    }
    return axios({
      method: 'GET',
      url: url,
      data: {}
    });
  },
  getAvailableCompanies: (page = 1, filter) => {
    let url = `/company/?page=${page}`;
    if (filter) {
      url = `/company/?page=${page}&filter=${filter}`;
    }
    return axios({
      method: 'GET',
      url: url,
      data: {}
    });
  },
  addCandidateAvatar: body => {
    return axios({
      method: 'POST',
      url: '/media/candidate/avatar/',
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  addCompanyAvatar: (body, companyType) => {
    return axios({
      method: 'POST',
      url: `/media/${globalMethods.findCompanyTypeName(companyType)}/avatar/`,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  addCompanyLogo: (body, companyType) => {
    return axios({
      method: 'POST',
      url: `/media/${globalMethods.findCompanyTypeName(companyType)}/logo/`,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  uploadResume: body => {
    return axios({
      method: 'POST',
      url: '/media/candidate/resume/',
      processData: false,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  signUpCandidate: body => {
    return axios({
      method: 'POST',
      url: '/candidate/',
      data: body
    });
  },
  signUpEmployer: body => {
    return axios({
      method: 'POST',
      url: '/employer/',
      data: body
    });
  },
  sendSMS: (phoneNumber, isSignUp) => {
    /**
     * reset token if we want to new login not sign up
     */
    if (isSignUp === false) {
      store.dispatch('auth/resetToken');
    }
    return axios({
      method: 'POST',
      url: '/auth/verify/phone-number/',
      data: {
        phone_number: phoneNumber
      }
    });
  },
  loginWithPhoneNumber: (phoneNumber, confirmation) => {
    return axios({
      method: 'POST',
      url: '/auth/login/phone-number/',
      data: {
        phone_number: phoneNumber,
        confirmation: confirmation
      }
    });
  },
  loginAsGuest: () => {
    return axios({
      method: 'POST',
      url: '/auth/login/guest/',
      headers: {
        'sendAuth': false
      },
      data: {}
    });
  },
  logout: () => {
    return axios({
      method: 'POST',
      url: '/auth/logout/',
      data: {}
    });
  },
  suggestSkill: body => {
    return axios({
      method: 'POST',
      url: '/suggest/',
      data: body
    });
  },
  getUserSetting: () => {
    return axios({
      method: 'GET',
      url: '/auth/setting/',
      data: {}
    });
  },
  putUserSetting: body => {
    return axios({
      method: 'PUT',
      url: '/auth/setting/',
      data: body
    });
  },
  registerFCMToken: FCMToken => {
    return axios({
      method: 'PUT',
      url: '/notification/firebase/instanceid/',
      data: {
        token: FCMToken
      }
    });
  },
  deleteFCMToken: FCMToken => {
    return axios({
      method: 'DELETE',
      url: '/notification/firebase/instanceid/',
      data: {
        token: FCMToken
      }
    });
  },
  postContactUsForm: body => {
    return axios({
      method: 'POST',
      url: '/shared/contact-us/',
      data: body,
      headers: {
        'sendAuth': false
      }
    });
  },
  getReasonQuestions: type => {
    return axios({
      method: 'GET',
      url: `/shared/job/reasons/?type=${type}`,
      data: {},
      headers: {
        'sendAuth': false
      }
    });
  },
  getIndustryList: (page = 1) => {
    return axios({
      method: 'GET',
      url: `/industry/?page=${page}`,
      data: {}
    });
  },
  getSharedPremiumCompanies: () => {
    return axios({
      method: 'GET',
      url: '/shared/premium/company/',
      data: {},
      headers: {
        'sendAuth': false
      }
    });
  },
  getSharedPremiumCompany: companyId => {
    return axios({
      method: 'GET',
      url: `/shared/premium/company/${companyId}/`,
      data: {},
      headers: {
        'sendAuth': false
      }
    });
  },
  getSharedPlans: () => {
    return axios({
      method: 'GET',
      url: '/shared/premium_package/',
      data: {},
      headers: {
        'sendAuth': false
      }
    });
  },
  postPremiumPackage: body => {
    return axios({
      method: 'POST',
      url: '/shared/premium_package/pay/',
      data: body,
      headers: {
        'sendAuth': false
      }
    });
  }
};
