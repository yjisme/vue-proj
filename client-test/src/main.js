import Vue from 'vue'
import App from "./App"
import router from './router'
import store from './store'
import "./assets/reset.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
