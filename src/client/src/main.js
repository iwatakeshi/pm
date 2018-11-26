import Vue from 'vue'
import VueRouter from 'vue-router'
window.axios = require('axios');

import App from './App.vue'

Vue.config.productionTip = false

// Pages
import Home from './pages/Home';
import Login from './pages/Login';

// Add Vue Router
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

const router = new VueRouter({ routes })


new Vue({
  render: h => h(App),
  router,
  data: () => ({
    token: null
  }),
}).$mount('#app')
