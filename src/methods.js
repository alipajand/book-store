/**
 * Get token from storage
 * @returns {string}
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check the block pages to redirect to appropriate pages
 * @param route
 * @returns {boolean}
 */
const routerGuard = (route) => {
  return route && (route.path.includes('/signUp') || route.path.includes('/login'));
};

/**
 * calculate expiration date
 */
const isTokenExpire = () => {
  const now = new Date();
  const expirationDate = new Date(localStorage.getItem('exp'));
  return now >= expirationDate;
};

/**
 * getUrlParams
 */
const getUrlParams = () => {
  const queryParams = {};
  window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    queryParams[key] = value;
  });
  return queryParams;
};

export default {
  getToken,
  routerGuard,
  isTokenExpire,
  getUrlParams
};
