import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor'
import newEditor from '@/components/newEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newEditor',
      component: newEditor
    }
  ]
})
