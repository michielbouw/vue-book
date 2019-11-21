import VueRouter from 'vue-router';

import Admin from './views/Admin';
import Book from './views/Book';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import NotFound from './views/NotFound';

import { isLoggedIn } from './services/authService';

const routes = [
  {
    path: '/',
    component: Book,
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn()) {
    next('sign-in');
  } else if (
    isLoggedIn() &&
    (to.path === '/sign-in' || to.path === '/sign-up')
  ) {
    next('/');
  } else {
    next();
  }
});
