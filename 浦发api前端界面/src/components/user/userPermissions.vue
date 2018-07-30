<template>
	<div class="contentBox">
		<!--<div >
			<Select v-model="model1" @on-change="listChange" style="width:200px">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
			</Select>
			<Button class="r" type="primary" @click="issue">发布</Button>
		</div>-->
		<!--<ul class="boxStatus">
			<li class="l" v-for="(data,index) in orderDataAll" @click="getIndex(index)" :class="{active:index==acyiveIndex}">{{data}}</li>
		</ul>-->
		<div class="contentList l">
			<Table :columns="columns1" :data="orderData"></Table>
		</div>
		<Modal v-model="modal1" class-name="vertical-center-modal" @on-ok="subBtn">
			<div slot="header" style="height: 20px;"></div>
			<div style="text-align: center;padding: 20px;padding-top: 0px;">
				<div class="">
					
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import axios from "axios";
	var qs = require("qs");

	import store from '@/store.js'
	export default {
		data() {
			return {
				modal1:true,
				orderDataAll: ['用户权限'],
				acyiveIndex: 0,
				user: '',
				user_card: '',
				orderData: [],
				model1: '',
				cityList: [{
						value: '按时间排序由远到近',
						label: '1'
					},
					{
						value: '按时间排序由近到远',
						label: '2'
					}
				],
				columns1: [{
						title: '名称',
						key: 'user',
						align: "center"
					},
					{
						title: '角色类型',
						key: 'idCard',
						align: "center"
					},
					{
						title: '角色权值',
						key: 'userStatus',
						align: "center",
											},
					{
						title: '描述',
						key: 'email',
						align: "center"
					},
//					{
//						title: '发布人',
//						key: 'phone',
//						align: "center"
//					},
					{
						title: '操作',
						key: 'moneyAll',
						align: "center",
						render: (h, params) => {
							return('div', [
								h('button', {
									style: {
										background: '#09e',
										width: '60px',
										height: '30px',
										marginRight: '10px',
										lineHeight: '30px',
										borderRadius: '6px'
									},
									on: {
										click: () => {
											let vm = this;
											vm.$router.push({
												path: '/userIndex',
												query: {
													id: params.row.id
												}
											})
										}
									}
								}, "详情"),
								h('button', {
									style: {
										background: 'red',
										width: '60px',
										height: '30px',
										marginRight: '10px',
										lineHeight: '30px',
										borderRadius: '6px'
									},
									on: {
										click: () => {
											let vm = this;
											console.log(params, 'params.rows')
											vm.delect(params.row.id)
										}
									}
								}, "删除")
							])
						}
					}

				],

			};
		},
		store,
		beforeCreate: function() {

		},
		created: function() {
			this.getData(0);
		},

		methods: {
subBtn(){},
			getIndex(index) {
				this.acyiveIndex = index;
				if(index==0){
					this.getData(0)
				}
				if(index==1){
					this.getData(1)
				}
				
				if(index==2){
					this.getData(2)
				}

			},
			listChange() {
				let vm = this;
				for(let i = 0; i < vm.cityList.length; i++) {
					if(vm.cityList[i].value == vm.model1) {
						console.log(vm.cityList[i].label, "label")
						vm.NowTime = vm.cityList[i].label;
					}
				}
				let data = qs.stringify({
					NowTime: vm.NowTime
				});
				vm.$http({
						url: vm.http + "/api/order/sorting",
						method: "post",
						data: data,
					})
					.then(res => {
						vm.$Message.success("操作成功");
						vm.orderData = res.data.data;
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
						//							this.$router.push("list");
					});
			},
			issue() {
				this.$router.push('/orderDetail')
			},
			delect(id) {
				let vm = this;
				let data = qs.stringify({
					id: id
				});
				vm.$http({
						url: vm.http + "/api/order/deleteOrder",
						method: "post",
						data: data,
					})
					.then(res => {

						vm.$Message.success("操作成功");
						vm.getData(0)
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
						//							this.$router.push("list");
					});
			},
			getData(a) {
				let vm = this;
				let data = qs.stringify({
					userStatus: a
				});
				
				vm.$http({
						url: vm.http + "/api/user/user",
						method: "post",
						data: data,
					})
					.then(res => {
						vm.orderData = res.data.data;
						console.log(res, "order");
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
						//							this.$router.push("list");
					});
			},
			warning(nodesc) {
				this.$Notice.warning({
					title: "密码不能为空"
				});
			},
			CancelTheOk() {
				this.$router.push("list");
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import "../../assets/css/userPermissions.css";
</style>