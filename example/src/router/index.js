import Vue from 'vue'
import Router from 'vue-router'
import test from '../test.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: test
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})
