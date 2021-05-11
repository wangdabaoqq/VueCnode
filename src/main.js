// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import FastClick from 'fastclick'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'normalize.css/normalize.css'
import timeago from 'timeago.js'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import VueParticles from 'vue-particles'
import App from './App'
import router from './router'
import store from './vuex'
Vue.use(MuseUI)
// Vue.use(VueParticles)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('common/image/logo.png'),
  attempt: 1
})

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.timeago = timeago
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
