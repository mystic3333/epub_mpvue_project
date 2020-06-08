import Vue from 'vue'
import mpvueRouterPatch from 'mpvue-router-patch'
import App from './index.vue'

Vue.use(mpvueRouterPatch)
const app = new Vue(App)
app.$mount()
