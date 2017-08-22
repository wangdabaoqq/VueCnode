import Vue from 'vue'
import Router from 'vue-router'
import Create from 'components/Create'
import Message from 'components/Message'
import Userinfo from 'components/Userinfo'
import About from 'components/About'
import Loading from 'components/Loading'
// import NotFoundComponent from 'base/404'

const Index = resolve => {
  require.ensure(['components/Index'], () => {
    resolve(require('components/Index'))
  })
}
const Detail = resolve => {
  require.ensure(['components/Detail'], () => {
    resolve(require('components/Detail'))
  })
}
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/loading'
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      component: Index
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
