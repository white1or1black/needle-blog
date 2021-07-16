import Vue from "vue";
import Router from "vue-router";
import Edit from '@/views/Edit';
import Login from '@/views/Login';
import BlogList from '@/views/BlogList';
import Article from '@/views/Article';

Vue.use(Router)
export default new Router({
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
      path: '/article',
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
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta: {
        title: 'Edit your blog'
      }
      
    }
  ]

})