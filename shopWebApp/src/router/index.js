import Vue from 'vue'
import Router from 'vue-router'
import Error from '@/components/common/error'
import Loading from '@/components/loadingAll/loading'//登陆
import LoadingImg from '@/components/loadingAll/loadingImg'//登陆
Vue.use(Router)

export default new Router({
	routes: [
	{
			path: '/loading',
			component: Loading,
		},
		{
			path: '/loadingImg',
			component: LoadingImg,
		},
		{
			path: '/error',
			component: Error,
		}, {
			path: '/',
			redirect: '/loadingImg'
		}, {
			path: '*',
			redirect: '/error'
		}
	]
})