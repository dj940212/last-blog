import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor'
import List from '@/components/list'
import Overview from '@/components/overview'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: Overview,
    },{
      path: '/list',
      name: 'list',
      component: List,

    },{
        path: '/article/:_id',
        name: 'article',
        component: Editor,
        beforeRouteUpdate: (to, from, next) => {
          
        }
    },{
        path: '/article/write',
        name: 'write',
        component: Editor
    }
  ]
})
