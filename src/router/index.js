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
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    console.log(savedPosition)
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  }
})
