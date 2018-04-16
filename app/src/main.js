import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify)

import VueMoment from 'vue-moment'
import moment from 'moment/src/moment'
import 'moment/src/locale/pt-br'
Vue.use(VueMoment, { moment })

import Auth from './app/services/Auth'
import App from './app/App.vue'
import Dashboard from './app/Dashboard.vue'
import Login from './app/Login.vue'

function requireAuth (to, from, next) {
  if (!Auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
})
