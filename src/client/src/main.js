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

// Add Vue Router
Vue.use(VueRouter);

// Configure routes
const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: Auth },
  { path: '/signup', component: Auth },
  { path: '/projects', component: Projects }
]

const router = new VueRouter({ routes })

// Configurations
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3333/'

const auth = new Authenticator();


const app = new Vue({
  render: h => h(App),
  router,
  data: () => ({
    path: window.location.hash.replace('#', ''),
    route: window.location.pathname,
  }),
  methods: {
    auth() {
      return auth;
    }
  }
});

// Watch for path and route changes
// https://github.com/vuejs/vue-router/issues/1807
router.beforeEach((to, from, next) => {
  app.path = to.path;
  app.route = to.fullPath;
  next();
})

app.$mount('#app')
