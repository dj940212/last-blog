import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor'
import List from '@/components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },{
        path: '/article',
        name: 'Editor',
        component: Editor
    },{
        path: '/article/write',
        name: 'Editor',
        component: Editor
    }
  ]
})
