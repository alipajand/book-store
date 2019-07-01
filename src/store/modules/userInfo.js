import services from '../../api/';
import globalMethods from '../../methods';

export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {
    FCMData: null,
    userInfo: null,
    notifications: null,
    impersonateData: null
  },

  // -----------------------------------------------------------------
  getters: {
    getUserInfo: state => state.userInfo,
    getFCMData: state => state.FCMData,
    getUserNotification: state => state.notifications,
    getUserImpersonatedData: state => state.impersonateData,
    isImpersonate() {
      return globalMethods.getAdminImpersonatedBy() || false;
    }
  },

  // -----------------------------------------------------------------
  mutations: {
    fillUserInfo: (state, data) => {
      state.userInfo = data;
    },
    fillFCMData: (state, data) => {
      if (state.FCMData && state.FCMData.data.created_at === data.data.created_at) {
        return;
      }
      state.FCMData = data;
    },
    fillUserNotification: (state, data) => {
      state.notifications = data;
    },
    fillUserImpersonatedData: (state, data) => {
      state.impersonateData = data;
    },
    resetUserImpersonatedData: (state) => {
      state.impersonateData = null;
    },
    resetUserInfo: (state) => {
      state.FCMData = null;
      state.userInfo = null;
      state.notifications = null;
      state.impersonateData = null;
    }
  },

  // -----------------------------------------------------------------
  actions: {
    getUserInfo({ commit }) {
      const userRole = globalMethods.getRole();
      const employer = globalMethods.employer();
      const candidate = globalMethods.candidate();
      const premiumEmployer = globalMethods.premiumEmployer();

      if (userRole === candidate) {
        services.candidates.getCandidateProfile().then(res => {
          /**
           * store data
           */
          commit('fillUserInfo', res.data.data);
        }).catch(() => {
          console.log('failed getCandidateProfile');
        });
      } else if (userRole === employer || userRole === premiumEmployer) {
        services.employers.getEmployerProfile().then(res => {
          /**
           * store data
           */
          commit('fillUserInfo', res.data.data);
        }).catch(() => {
          console.log('failed getEmployerProfile');
        });
      }
    }
  }
};
