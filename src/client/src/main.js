import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bulma';
import axios from 'axios';

import App from './App.vue'

Vue.config.productionTip = false
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/Projects';
// Add Vue Router
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/projects', component: Projects }
]

const router = new VueRouter({ routes })


new Vue({
  render: h => h(App),
  router,
  data: () => ({
    token: null
  }),
  beforeMount() {
    this.checkLogin();
  },
  mounted() {
    
  },
  methods: {
    isLoggedIn() {
      return this.token !== null;
    },
    checkLogin() {
      if (!this.token && !window.localStorage.getItem('token')) this.$router.push("/login");
      else {
        this.token = localStorage.getItem('token');
      }
    }
  }
}).$mount('#app')
