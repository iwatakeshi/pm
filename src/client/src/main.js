import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.config.productionTip = false

// Add Vue Router
Vue.use(VueRouter);

const routes = [
  { path: '/', component: require("./pages/Home") },
  // { path: '/project/:id', component: require('pages/Project') },
  // { path: '/task/:id', component: require('pages/Task') }
]

const router = new VueRouter({ routes })



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
