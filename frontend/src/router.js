import Vue from 'vue';
import VueRouter from "vue-router";
import Edit from '@/views/Edit';
import Login from '@/views/Login';
import BlogList from '@/views/BlogList';
import Article from '@/views/Article';

Vue.use(VueRouter);

const routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: BlogList,
      meta: {
        title: 'Needle\' home'
      }
    }, {
      path: '/blogs',
      name: 'BlogList',
      component: BlogList,
      meta: {
        title: 'blog list'
      }
    }, {
      path: '/article/:id',
      name: 'Article',
      component: Article,
      meta: {
        title: 'Article'
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    }, {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: {
        title: 'Edit your blog'
      }
    }
  ]
};

const router = new VueRouter(routes);
export default router;