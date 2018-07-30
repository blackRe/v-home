<template>
	<div class="contentBox">
		<div style="border: 1px solid red;width: 920px;height: 40px;">
			<!--<Select v-model="model1" @on-change="listChange" style="width:200px">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
			</Select>-->
			<Button class="r" type="primary" @click="issue">发布</Button>
		</div>
		<ul class="boxStatus">
			<li class="l" v-for="(data,index) in orderDataAll" @click="getIndex(index)" :class="{active:index==acyiveIndex}">{{data}}</li>
		</ul>
		<div class="contentList l">
			<Table :columns="columns1" :data="orderData"></Table>
		</div>
		<Modal v-model="modal1" class-name="vertical-center-modal" @on-ok="goOk">
			<div slot="header" style="height: 20px;"></div>
			<div class="box" style="text-align: center;padding: 20px;padding-top: 0px;">
				<div v-for="(data,index) in address" class="home" style="margin-bottom: 10px;">
					<div class="l" style="width: 400px; ">{{data}}</div>
					<Button type="error" @click="delectAll(index)">-</Button>
				</div>
				<Input style="margin-bottom: 20px;" class="inputContentInput" v-model="addressData" placeholder="请输入详细信息,添加地址"></Input>
				<!--<Button class="l" type="primary" @click="upDataRedis(1)">修改发布地址</Button>-->
				<Button class="r" type="primary" @click="send(1)">发布地址</Button>
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
				addressData: '',
				id: '',
				address: [],
				modal1: false,
				orderDataAll: ['未完成', '已完成', '待付款', '已付款', '已退款', '取消退款', '已删除'],
				acyiveIndex: 0,
				user: '',
				user_card: '',
				orderData: [],
				model1: '',
				cityList: [{
						value: '武汉是',
						label: '1'
					},
					{
						value: '襄阳',
						label: '2'
					},
					{
						value: '随州',
						label: '3'
					}
				],
				columns1: [{
						title: '名称',
						key: 'name',
						align: "center"
					},
					{
						title: '用户订单号',
						key: 'orderNumber',
						align: "center"
					},
					{
						title: '订单状态',
						key: 'status',
						align: "center",
						render: (h, params) => {
							console.log(params)
							let a = '';
							switch(params.row.status) {
								case status = 0:
									a = '未完成';
									break;
								case status = 1:
									a = '已完成';
									break;
								case status = 2:
									a = '未付款';
									break;
								case status = 3:
									a = '已付款';
									break;
								case status = 4:
									a = '已退款';
									break;
								case status = 5:
									a = '取消提款';
									break;

								default:
									break;
							}
							return('div', [
								h('div', {
									style: {
										//										background: '#09e',
										//										width: '60px',
										height: '30px',
										marginRight: '10px',
										lineHeight: '30px',
										borderRadius: '6px',
										textAlign: 'center'
									},

								}, a),

							])
						}
					},
					{
						title: '数量',
						key: 'count',
						align: "center"
					},
					{
						title: '操作',
						key: 'moneyAll',
						width: '250',
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
												path: '/orderDetail',
												query: {
													id: params.row.id
												}
											})
										}
									}
								}, "详情"), h('button', {
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
											vm.modal1 = true
											vm.id = params.row.id
											vm.addressData=''
											vm.getAddress(vm.id)
										}
									}
								}, "收货地址"),
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
			goOk() {},
			delectAll(index) {
				this.address.splice(index, index + 1)
				console.log(this.address, "this.address")
				this.send(2)
			},
			getAddress(id) {
				let vm = this;
				let data = qs.stringify({
					id: id,
				});

				vm.$http({
						url: vm.http + "/api/order/getRedis",
						method: "post",
						data: data,
					})
					.then(res => {
						vm.address = []
						console.log(res, "获取地址")
						if(res.data.code == 200) {
							vm.address = res.data.data.split(',')
						} else {
							this.$Message.error(res.data.data);
						}

					})
					.catch(err => {

					});
			},
			upDataRedis(all) {

				let vm = this;
				if(!all) {
					if(vm.addressData == "") {
						this.$Message.error('地址不能为空');
						return false;
					}
				}

				const arry = vm.address;
				if(vm.addressData) {
					arry.unshift(vm.addressData);
				}

				let a = arry.join(',');
				let data = qs.stringify({
					id: vm.id,
					address: a
				});

				vm.$http({
						url: vm.http + "/api/order/upRedis",
						method: "post",
						data: data,
					})
					.then(res => {
						//						需要一个跟新的方法
						//						vm.getAddress(vm.id)
						console.log(res, "参数修改成功")
					})
					.catch(err => {

					});
			},
			send(aa) {
				let vm = this;
				console.log(aa,'all')
				if(aa==1) {
					if(vm.addressData == "") {
						this.$Message.error('地址不能为空');
						return false;
					}
				}

				const arry = vm.address;
				if(vm.addressData) {
					arry.unshift(vm.addressData);
				}

				let a = arry.join(',');
				let data = qs.stringify({
					id: vm.id,
					address: a
				});

				vm.$http({
						url: vm.http + "/api/order/address",
//						url: vm.http + "/api/order/addredis",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, "res")
					})
					.catch(err => {

					});
			},
			getIndex(index) {
				this.acyiveIndex = index;
				switch(index) {
					case 0:
						this.getData(0);
						break;
					case 1:
						this.getData(1);
						break;
					case 2:
						this.getData(2);
						break;
					case 3:
						this.getData(3);
						break;

					case 4:
						this.getData(4);
						break;
					case 5:
						this.getData(5);
						break;
					case 5:
						this.getData(6);
						break;
					default:
						break;
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
			getData(status) {
				let vm = this;
				let data = qs.stringify({
					status: status,
					//					delect: delect
				});
				vm.$http({
						url: vm.http + "/api/order/orderList",
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
	@import "../../assets/css/orderList.css";
</style>