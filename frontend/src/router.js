import Vue from "vue";
import Router from "vue-router";
import Edit from '@/views/Edit';
import Home from '@/views/Home';
import Login from '@/views/Login';

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Needle\' home'
      }
    }, {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    }, {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta: {
        title: 'Edit your blog'
      }
      
    }
  ]

})