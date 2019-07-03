import $axios from 'axios';

export default {
  getUserInfo: () => {
    return $axios({ method: 'GET', url: 'user/', data: {} });
  },
  updateUser: () => {
    return $axios({ method: 'PATCH', url: 'user/', data: {} });
  },
  deleteUser: () => {
    return $axios({ method: 'DELETE', url: 'user/', data: {} });
  },

  /**
   * log out from app
   * @returns {AxiosPromise}
   */
  logout: () => {
    return $axios({ method: 'POST', url: 'logout/', data: {} });
  }
};
