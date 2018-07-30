import Vue from 'vue'
import Router from 'vue-router'

import landingAdmin from '@/components/adminLoad/loading'
import ChangePassword from '@/components/adminLoad/changePassword'
import ChangePasswordTwo from '@/components/adminLoad/changPasswordTwo'
import ChangePasswordOk from '@/components/adminLoad/changePasswordOk'
import Registered from '@/components/adminLoad/registered'
import listAll from '@/components/auditsManage/listAll'
//import listDetail from '@/components/auditsManage/listDetail'
import addList from '@/components/auditsManage/addList' //发布个人信息
//
import orderList from '@/components/order/orderList' //发布个人信息
import orderDetail from '@/components/order/addOrder' //发布个人信息

import Demo from '@/components/adminLoad/demo'
import List from '@/components/common/list'
import head from '@/components/common/head'
import userIndex from '@/components/user/userAdd'
import userList from '@/components/user/userList'
import userPermissions from '@/components/user/userPermissions'
import message from '@/components/message/systemMessage'
import notive from '@/components/message/notive'
Vue.use(Router)
// 设置他的文件路由#不显示
export default new Router({
	mode: 'history',
	routes: [
	
	{
			path: '/permissions', //用户审批
			component: userPermissions
		},
	{
			path: '/notive', //用户审批
			component: notive
		},{
			path: '/message', //用户审批
			component: message
		},{
			path: '/userList', //用户审批
			component: userList
		}, {
			path: '/userindex', //
			component: userIndex
		}, {
			path: '/orderDetail', //订单详情
			component: orderDetail
		}, {
			path: '/orderList', //订单
			component: orderList
		},
		{
			path: '/addList',
			component: addList
		},

		{
			path: '/listAll',
			component: listAll
		},
		{
			path: '/head',
			component: head
		},
		{
			path: '/changeok',
			component: ChangePasswordOk
		},
		{
			path: '/registered',
			component: Registered
		},
		{
			path: '/demo',
			component: Demo
		},
		{
			path: '/changepassword',
			component: ChangePassword
		},
		{
			path: '/changepasswordtowo',
			component: ChangePasswordTwo
		},
		{
			path: '/list',
			component: List
		},
		{
			path: '/admin',
			component: landingAdmin,
		}, {
			path: '/',
			redirect: '/admin'
		}, {
			path: '*',
			redirect: '/admin'
		}
	]
})