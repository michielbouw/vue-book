import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App';
import { store } from './store';
import { router } from './router';
import { auth } from './firebase';
import './registerServiceWorker';

let app = '';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      store,
      router,
    }).$mount('#app');
  }
});
