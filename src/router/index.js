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

// 判断登录后再跳转
// router.afterEach((to, from) => {
//     if (!cookie.get('dj940212') && to.path === '/auth/callback') {
//         console.log(to.query.code)
//         axios.get(config.oauth.getTokenUrl,{params: {
//             client_id:'0f117211d715eb9eb73e',
//             client_secret: 'af53da820d42bec5fceb6079e86c56a7b41244b5',
//             code: to.query.code
//         }}).then((res) => {
//             const access_token = res.data.split("&")[0]
//             axios.get(`https://api.github.com/user?${access_token}`).then((res) => {
//                 console.log(res.data)
//             })
//         })
//     }
    
// })

export default router
