/**
 * Check the block pages to redirect to appropriate pages
 * @param route
 * @returns {boolean}
 */
const isBlockPage = (route) => {
  return route && (route.path.includes('/signUp') || route.path.includes('/login'));
};

/**
 * Call this before enter the route
 * @param route
 * @param router
 */
const routerGuard = (route, router) => {
  if (isBlockPage(route)) {
  }
};

export default {
  routerGuard
};
