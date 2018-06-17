import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Article from '../pages/article_page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    }
  ]
})
