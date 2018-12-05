import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bulma'
import axios from 'axios'
import Authenticator from './core/auth/Authenticatior'

// App
import App from './App.vue'

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Project from './pages/Project';

// Add Vue Router
Vue.use(VueRouter);

// Configure routes
const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: Auth },
  { path: '/signup', component: Auth },
  { path: '/projects', component: Projects },
  { path: '/project/:id', component: Project }
]

const router = new VueRouter({ routes })

// Configurations
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3333/'
Vue.prototype.auth = new Authenticator();

window.axios = axios;

const app = new Vue({
  render: h => h(App),
  router,
  data: () => ({
    path: window.location.hash.replace('#', ''),
    route: window.location.pathname,
  }),
  beforeCreate() {
    this.auth.authenticate();
  }
  // methods: {
  //   auth {
  //     return auth;
  //   }
  // }
});

// Watch for path and route changes
// https://github.com/vuejs/vue-router/issues/1807
router.beforeEach((to, from, next) => {
  app.auth.authenticate();
  // console.log(`Router - Authenticated: ${app.auth.isAuthenticated()}`);
  next();
})

app.$mount('#app')
