import Index from '../views/private/index';
import Book from '../views/private/book';
import Profile from '../views/private/profile';

import router from './index';
import globalMethods from '../methods';

export default {
  routes: () => {
    return [
      {
        path: 'private',
        component: Index,
        redirect: { name: 'books' },
        beforeEnter(to, from, next) {
          if (!globalMethods.getToken()) {
            router.push({
              name: 'error',
              params: {
                id: '401'
              }
            });
          }

          /**
           * Continue
           */
          next();
        },
        children: [
          {
            name: 'books',
            path: 'books',
            component: Book
          },
          {
            name: 'profile',
            path: 'profile',
            component: Profile
          }
        ]
      }
    ];
  }
};
