import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App';
import { store } from './store';
import { router } from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
