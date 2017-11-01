import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/pages/add'
import List from '@/pages/list'
import Labels from '@/pages/labels'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Article from '@/pages/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/index'], resolve),
    },{
      path: 'articles',
      component: List
    },{
        path: '/article/:_id',
        component: Article
    },{
        path: '/new',
        component: Add
    },{
      path: '/login',
      component: Login 
    },{
      path: '/labels',
      component: Labels
    }
  ]
})
