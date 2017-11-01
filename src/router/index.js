import Vue from 'vue'
import Router from 'vue-router'
// import Add from '@/pages/add'
// import List from '@/pages/list'
// import Labels from '@/pages/labels'
// import Index from '@/pages/index'
// import Login from '@/pages/login'
// import Article from '@/pages/article'

const Index = () => import('@/pages/index')
const Add = () => import('@/pages/add')
const List = () => import('@/pages/list')
const Labels = () => import('@/pages/labels')
const Login = () => import('@/pages/login')
const Article = () => import('@/pages/article')

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: Index,
    },{
        path: '/articles',
        component: List
    },{
        path: '/article/:_id',
        component: Article
    },{
        path: '/new',
        component: Add
    },{
        path: '/login',
        components: {login: Login} 
    },{
        path: '/labels',
        component: Labels
    }
  ]
})
