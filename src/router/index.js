import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home';
import Cart from '@/components/Cart';
import Category from '@/components/Category';
import GoodDetail from '@/components/GoodDetail';
import SearchPage from '@/components/SearchPage';
import Mine from '@/components/Mine';
import Login from '@/components/Login';
import Reg from '@/components/Reg';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/home',
        name: 'Home',
        component: Home
    }, {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/category',
        name: 'Category',
        component: Category
    }, {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }, {
        path: '/search',
        name: 'Search',
        component: SearchPage,
    }, {
        path: '/mine',
        name: 'Mine',
        component: Mine,
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
    }, {
        path: '/register',
        name: 'Register',
        component: Reg,
    }, {
        path: '/category/:id',
        name: 'category-sub',
        component: Category,
    }, {
        path: '/detail:id',
        name: 'GoodDetail',
        component: GoodDetail,
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '*',
        redirect: '/home'
    }]
})