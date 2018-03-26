import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Study from '../components/Study'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: 'study/:subject',
      name: 'Study',
      component: Study
    }
  ]
})
