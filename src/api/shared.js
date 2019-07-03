import $axios from 'axios';

export default {
  getUserInfo: () => {
    return $axios({ method: 'GET', url: 'user/', data: {} });
  },
  updateUser: (body) => {
    return $axios({ method: 'PATCH', url: 'user/', data: body });
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
