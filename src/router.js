import VueRouter from 'vue-router';

import Admin from './views/Admin';
import Book from './views/Book';
import NotFound from './views/NotFound';

const routes = [
  { path: '/', component: Book },
  { path: '/admin', component: Admin },
  { path: '*', component: NotFound },
];

export const router = new VueRouter({
  routes,
  mode: 'history',
});
