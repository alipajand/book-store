import store from '../store';
import router from '../router';
import globalMethods from '../methods';

import axios from 'axios';
import axiosCancel from 'axios-cancel';

axios.defaults.headers.common['Accept-Language'] = 'fa-IR';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.baseURL = 'https://beta-api.3sootjobs.com';
// axios.defaults.baseURL = 'https://api.3sootjobs.com';

/**
 * Before send request
 */
axios.interceptors.request.use(config => {
  if (config.headers.sendAuth !== false) {
    config.headers.Authorization = globalMethods.getCurrentToken();
  }

  delete config.headers['sendAuth'];
  return config;
});

/**
 * Error Handling after send request
 */
axios.interceptors.response.use(res => {
  if (res.headers.authorization !== undefined) {
    globalMethods.setGlobalToken(res.headers.authorization);
  }
  return res;
}, err => {
  /**
   * Check the error status codes and redirect to error path
   */
  if (err.response && err.response.status) {
    const errorCode = err.response.status;
    if (errorCode === 401 || errorCode === 403 || errorCode === 503) {
      if (errorCode === 401) {
        store.dispatch('auth/resetToken');

        if (window.location.pathname.startsWith('/private')) {
          router.push({
            name: 'error',
            params: {
              id: errorCode
            },
            query: {
              returnUrl: window.location.href
            }
          });
        }
      } else {
        router.push({
          name: 'error',
          params: {
            id: errorCode
          }
        });
      }
    }
  }

  return Promise.reject(err);
});

/**
 * handle token cancellation
 */
axiosCancel(axios, {
  debug: process.env.NODE_ENV !== 'production'
});
