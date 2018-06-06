// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// Vue.use(axios);
// ui引入
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 全局引入css样式文件
import "./assets/css/style.css";
axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded";
//axios.defaults.headers['Content-Type']=['application/json']
axios.defaults.withCredentials=true;


Vue.prototype.$http = axios;
Vue.prototype.http='/ajaxurl';




Vue.use(iView);
Vue.config.productionTip = false
//入口判断显示与否
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import store from './store.js'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store, //使用store
	components: {
		App
	},
	template: '<App/>'
})