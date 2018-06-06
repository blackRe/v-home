<template>
	<div class="contentBox">
		<div class="addText">
			数据添加
			<Button class="r" type="primary" @click="submitAll">发布</Button>
		</div>
		<div class="addInput">
			<div class="inputContent">
				<div class="inputContentText l">用户名：</div>
				<Input class="inputContentInput" v-model="user" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">真实姓名：</div>
				<Input class="inputContentInput" v-model="name" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品名称：</div>
				<Input class="inputContentInput" v-model="productName" placeholder="请输入产品名称"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">联系电话：</div>
				<Input class="inputContentInput" v-model="phone" placeholder="请输入电话"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">单位选择：</div>
				<Select v-model="unit" class="inputContentInput">
					<Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">金额单位：</div>
				<Select v-model="unit1" class="inputContentInput">
					<Option v-for="item in cityList1" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">订单号：</div>
				<Input class="inputContentInput" v-model="user_card" placeholder="请输入联系电话"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">数量：</div>
				<Input class="inputContentInput" v-model="count" placeholder="请输入数量"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">单价：</div>
				<Input class="inputContentInput" v-model="parcie" placeholder="请输入单价"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">折扣：</div>
				<Input class="inputContentInput" v-model="discount" placeholder="请输入折扣"></Input>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from "axios";
	var qs = require("qs");

	import store from '@/store.js'
	export default {
		data() {
			return {
				msg: "欢迎进入浦发银行网站",
				valueOne: "",
				valueTwo: "",
				cityList: ['公斤', '斤', 'L', '吨'],
				cityList1: ['元', '美元', '欧元', '日元', '韩元'],
				modal1: false,
				listData: '',
				getUrl: '',
				id: '',
				name: '', //姓名
				user: '', //用户名
				productName: '', //产品名称
				phone: '', //电话
				unit: '', //单位
				unit1: '', //单位
				count: '', //数量
				parcie: '', //单价
				discount: '', //折扣
				NowTime: '', //订单生成时间
				user_card: '', //订单号
				status:'',//状态
			};
		},
		store,
		beforeCreate: function() {

		},
		created: function() {

			this.id = this.$route.query.id;
			let vm = this;
			if(this.id) {
				vm.gitData(vm.id)
			}
			this.getUrl = this.http + "/api/klp/setImg"
		},

		methods: {
			submitAll() {
				let vm=this;
				let str = ""
				let data = "";
//				存在id就是跟新数据，不存在就是新增
				if(vm.id) {
					str = 'upload'
					data = qs.stringify({
						id: vm.id,
						user: vm.user, //用户名
						name: vm.name, //真是姓名
						productName: vm.productName, //产品名称
						phone: vm.phone, //联系电话
						unit: vm.unit, //单位元，美元
						unit1: vm.unit1, //斤两
						count: vm.count, //数量
						parcie: vm.parcie, //单价
						discount: vm.discount, //折扣
						status:vm.status,//状态
					});
				} else {
					data = qs.stringify({
						user: vm.user, //用户名
						name: vm.name, //真是姓名
						productName: vm.productName, //产品名称
						phone: vm.phone, //联系电话
						unit: vm.unit, //单位元，美元
						unit1: vm.unit1, //斤两
						count: vm.count, //数量
						parcie: vm.parcie, //单价
						discount: vm.discount, //折扣

					});
					str = 'add'
				}
				console.log(data,'data')
				vm.$http({
						url: vm.http + "/api/order/" + str,
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, '婆婆婆婆');
						if(res.data.code == 200) {
							vm.$Message.success("数据获取成功");
							vm.listData = res.data.data;
							//							alert(9)
						} else {
							vm.$Message.error("列表查询失败");
						}
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
						//							this.$router.push("list");
					});

			},
			handleSuccess(res, file) {
				console.log(res, 'file')
				this.img = res.img
				//				alert(res.img)

			},
			gitData(id) {
				let vm = this;
				let data = qs.stringify({
					id: id,
				});
				vm.$http({
						url: vm.http + "/api/order/orderDetail",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;

						if(res.data.code == 200) {
							vm.id = data.id;
							vm.user = data.user; //用户名
							vm.name = data.name //真是姓名
							vm.productName = data.productName //产品名称
							vm.phone = data.phone //联系电话
							vm.unit = data.unit //单位元，美元
							vm.unit1 = data.unit1, //斤两
							vm.count = data.count //数量
							vm.parcie = data.parcie //单价
							vm.discount = data.discount //折扣
							vm.user_card = data.user_card
							vm.status=data.status;//状态
						} else {
							vm.$Message.error("详情查询失败");
						}
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
						//							this.$router.push("list");
					});

			},

			info(nodesc, describe) {
				this.$Notice.info({
					title: '通知信息',
					desc: nodesc ? '' : describe
				});
			},
			success(nodesc, describe) {
				this.$Notice.success({
					title: '通知信息',
					desc: nodesc ? '' : describe
				});
			},
			warning(nodesc, describe) {
				this.$Notice.warning({
					title: '通知信息',
					desc: nodesc ? '' : describe
				});
			},
			error(nodesc, describe) {
				this.$Notice.error({
					title: '通知信息',
					desc: nodesc ? '' : describe
				});
			}

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import "../../assets/css/addList.css";
</style>