/**
 * Check the block pages to redirect to appropriate pages
 * @param route
 * @returns {boolean}
 */
const routerGuard = (route) => {
  return route && (route.path.includes('/signUp') || route.path.includes('/login'));
};

export default {
  routerGuard
};
