import Vue from 'vue'
import App from './Search.vue'
import mpvueRouterPatch from 'mpvue-router-patch'

Vue.use(mpvueRouterPatch)

const app = new Vue(App)
app.$mount()
