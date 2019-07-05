import axios from 'axios';
import globalMethods from '../methods';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://hiring.bsup.tk/api/' : 'http://localhost:8080/';

/**
 * Before send request
 */
axios.interceptors.request.use(config => {
  /**
   * check for sending a token in a service call or not
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
