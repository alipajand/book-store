import axios from 'axios';
import globalMethods from '../methods';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'http://hiring.bsup.tk/api/';

/**
 * Before send request
 */
axios.interceptors.request.use(config => {
  /**
   * check for sending a token in service or not
   */
  if (config.headers.sendToken !== false) {
    config.headers.Authorization = globalMethods.getToken();
  }
  delete config.headers['sendToken'];
  return config;
});

/**
 * Error Handling after send request
 */
axios.interceptors.response.use(res => {
  return res;
}, err => {
  return Promise.reject(err);
});
