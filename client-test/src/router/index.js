import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: "/detail/:id",
        name: "movie-detail",
        component: Detail
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
