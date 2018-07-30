// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import "./assets/css/style.css";
Vue.use(MintUI)
import "./assets/js/rem.js";


axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded";
//axios.defaults.headers['Content-Type']=['application/json']
axios.defaults.withCredentials=true;
Vue.prototype.$http = axios;
Vue.prototype.http='/ajaxurl';



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
