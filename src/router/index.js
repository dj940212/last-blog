import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'
import config from '@/config'
import axios from 'axios'

const Index = () => import('@/pages/index')
const Add = () => import('@/pages/add')
const List = () => import('@/pages/list')
const Labels = () => import('@/pages/labels')
const Login = () => import('@/pages/login')
const Article = () => import('@/pages/article')

Vue.use(Router)

const router = new Router({
  mode: 'history',
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

export default router
