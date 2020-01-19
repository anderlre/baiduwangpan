import Vue from 'vue'
import Router from 'vue-router'
import Login from '../Login'
import Home from '../views/Home'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'all-files',
      children:[
        //数据概览
        {
          path: '/all-files',
          name: 'all-files',
          component: () => import(/* webpackChunkName: "views" */ '../views/AllFiles'),
        },
        {
          path: '/image',
          name: 'image',
          component: () => import(/* webpackChunkName: "views" */ '../views/Image'),
        },
        {
          path: '/video',
          name: 'video',
          component: () => import(/* webpackChunkName: "views" */ '../views/Video'),
        },
        {
          path: '/update',
          name: 'update',
          component: () => import(/* webpackChunkName: "views" */ '../views/UpdateMessage'),
        },
        ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "views" */ '../views/Register'),
    },
  ]
})
