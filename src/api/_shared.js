import $axios from 'axios';

export default {
  getUserInfo: () => {
    return $axios({
      method: 'GET',
      url: 'user',
      data: {}
    });
  },
  logout: () => {
    return $axios({
      method: 'POST',
      url: 'logout',
      data: {},
      headers: {
        sendToken: false
      }
    });
  }
};
