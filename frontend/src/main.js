import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCookie from 'vue-cookies';

Vue.use(VueCookie);

Vue.config.productionTip = false;

Vue.prototype.$routeJumpByName = function(name) {
  this.$router.push({name, query: this.$route.query});
};

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
