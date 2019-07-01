import Index from '../views/public/Index';
import ErrorPage from '../views/public/pages/error';
import HomeComponent from '../views/public/pages/home';
import LoginComponent from '../views/public/pages/login';

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
        props: true,
        name: 'login',
        path: '/login',
        component: LoginComponent
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
