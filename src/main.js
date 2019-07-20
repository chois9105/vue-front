import Vue from 'vue'
import App from "./App.vue";
import VueRouter from 'vue-router'
import './plugins/element.js'

// dynamic imports
const LoginForm = () => import('./components/LoginForm.vue');
const Profile = () => import('./components/Profile.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: '/', component: LoginForm },
    { path: '/profile', component: Profile},    
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");