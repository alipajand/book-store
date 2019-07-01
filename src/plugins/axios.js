import axios from 'axios';

axios.defaults.baseURL = 'https://beta-api.3sootjobs.com';
axios.interceptors.response.use(res => {
  return res;
}, err => {
  return Promise.reject(err);
});
