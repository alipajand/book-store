import Index from '../views/Index';
import ErrorPage from '../views/pages/error';
import HomeComponent from '../views/pages/home';

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
          }
        ]
      },
      {
        path: '/home',
        redirect: { name: 'home' }
      },
      {
        name: 'error',
        path: '/error/:id',
        component: ErrorPage
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
