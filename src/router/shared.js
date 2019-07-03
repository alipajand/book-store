import Index from '../views/index';
import ErrorPage from '../views/shared/error';
import HomeComponent from '../views/shared/home';
import Private from './private';

const routes = [];
Private.routes().map(item => {
  routes.push(item);
});

export default {
  routes: () => {
    return [
      /**
       * Shared routes
       */
      {
        path: '/',
        component: Index,
        redirect: { name: 'home' },
        children: [
          /**
           * private routes
           */
          ...routes,
          {
            name: 'home',
            path: '',
            component: HomeComponent
          },
          {
            name: 'error',
            path: 'error/:id',
            component: ErrorPage
          }
        ]
      },
      {
        path: '/home',
        redirect: { name: 'home' }
      },

      /**
       * Not found
       */
      {
        path: '*',
        redirect: { name: 'error', params: { id: 404 } }
      }
    ];
  }
};
