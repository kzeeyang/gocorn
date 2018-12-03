import Vue from 'vue'
import Router from 'vue-router'

import all from '../components/all'
import ping from '../components/ping'
import addjob from '../components/addjob'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/all',
      name: 'all',
      component: all,
    },
    {
      path: '/ping',
      name: 'ping',
      component: ping,
    },
    {
      path: '/addjob',
      name: 'addjob',
      component: addjob,
    },
  ]
})
