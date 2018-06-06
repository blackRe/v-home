<template>
	<div class="contentBox">
		<div class="addText">
			数据添加
			<Button class="r" type="primary" @click="submitAll">发布</Button>
		</div>
		<div class="addInput">
			<div class="inputContent">
				<div class="inputContentText l">姓名：</div>
				<Input class="inputContentInput" v-model="name" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">个人图片：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<!--<Input class="inputContentInput" v-model="value" placeholder="请输入姓名"></Input>-->
			</div>
			<div class="inputContent">
				<div class="inputContentText l">从业年限：</div>
				<Input class="inputContentInput" v-model="year" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">年龄：</div>
				<Input class="inputContentInput" v-model="age" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">详情描述：</div>
				<Input class="inputContentInput" v-model="detail" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">所在省：</div>
				<Select v-model="priction" class="inputContentInput">
					<Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">所在市区：</div>
				<Select v-model="ctiy" class="inputContentInput">
					<Option v-for="item in cityList1" :value="item" :key="item">{{ item }}</Option>
				</Select>

			</div>
			<div class="inputContent">
				<div class="inputContentText l">联系电话：</div>
				<Input class="inputContentInput" v-model="phone" placeholder="请输入联系电话"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">本人微信：</div>
				<Input class="inputContentInput" v-model="chart" placeholder="请输入微信"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">本人qq：</div>
				<Input class="inputContentInput" v-model="qq" placeholder="请输入qq"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">目前汇率：</div>
				<Input class="inputContentInput" v-model="numberAll" placeholder="请输入汇率："></Input>
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
				cityList: [1, 2, 3, 4],
				cityList1: [1, 2, 3, 4],
				modal1: false,
				listData: '',
				getUrl: '',
				id: '',
				numberAll: '', //汇率
				age: '', //年龄
				name: '', //姓名
				detail: '', //简介
				img: '', //上传图片
				phone: '', //联系电话
				qq: '', //qq
				chart: '', //微信
				priction: '', //省
				ctiy: '', //市	
				year: '',

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
				let vm = this;
				if(vm.name == "") {
					this.error(false, '姓名不能为空');
					return false;
				}
				if(vm.img == "") {
					this.error(false, '图片不能为空');
					return false;
				}
				if(vm.year == "") {
					this.error(false, '从业年限不能为空');
					return false;
				}

				if(vm.age == "") {
					this.error(false, '年龄不能为空');
					return false;
				}
				if(vm.detail == "") {
					this.error(false, '描述不能为空');
					return false;
				}
				if(vm.priction == "") {
					this.error(false, '省不能为空');
					return false;
				}
				if(vm.ctiy == "") {
					this.error(false, '市不能为空');
					return false;
				}

				let str = ""
				let data=""
				if(vm.id) {
					str = 'upload'
					data = qs.stringify({
						id:vm.id,
						age: vm.age, //年龄
						name: vm.name, //姓名
						detail: vm.detail, //简介
						img: vm.img, //上传图片
						province: vm.priction, //省province
						ctiy: vm.ctiy, //市	
						number: vm.year,
						year: vm.numberAll, //汇率
						phone: vm.phone, //联系电话
						qq: vm.qq, //qq
						chart: vm.chart, //微信
					});
				} else {
					data = qs.stringify({
						age: vm.age, //年龄
						name: vm.name, //姓名
						detail: vm.detail, //简介
						img: vm.img, //上传图片
						province: vm.priction, //省
						ctiy: vm.ctiy, //市	
						number: vm.year,
						year: vm.numberAll, //汇率
						phone: vm.phone, //联系电话
						qq: vm.qq, //qq
						chart: vm.chart, //微信
					});
					str = 'loginAll'

				}
				vm.$http({
						url: vm.http + "/api/getList/" + str,
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
						url: vm.http + "/api/getList/getShop",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;
						if(res.data.code == 200) {
							//							vm.getUrl=

							vm.age = data.age;
							vm.numberAll = data.number;
							vm.name = data.name;
							vm.detail = data.detail
							vm.img = data.img
							vm.phone = data.phone
							vm.qq = data.qq
							vm.img = data.img
							vm.phone = data.phone
							vm.chart = data.chart
							vm.priction = data.province
							vm.ctiy = data.ctiy
							vm.year = data.year
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