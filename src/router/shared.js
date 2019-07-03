import Index from '../views/index';
import ErrorPage from '../views/shared/error';
import HomeComponent from '../views/shared/home';

export default {
  routes: () => {
    return [
      /**
       * Share routes
       */
      {
        path: '/',
        component: Index,
        redirect: { name: 'home' },
        children: [
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
