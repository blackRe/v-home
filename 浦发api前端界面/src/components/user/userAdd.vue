<template>
	<div class="contentBox">
		<div class="addText" v-if="urlId">
			用户审批
			<Button class="r" type="primary" @click="submitAll">发布</Button>
		</div>
		<div class="addText" v-else="urlId">
			用户发布
			<Button class="r" type="primary" @click="submitAll">发布</Button>
		</div>
		<div class="addInput">
			<div class="inputContent" v-if="urlId">
				<div class="inputContentText l">审批状态：</div>
				<div class="inputContentInput1">
					<Button type="primary" @click="ok">通过</Button>
					<Button type="primary" @click="no">不通过</Button>
				</div>
			</div>
			<div class="inputContent" v-if="urlId">
				<div class="inputContentText l">审批状态：</div>
				<div class="inputContentInput1 " v-if="status==0">待审批</div>
				<div class="inputContentInput1" v-if="status==1">已通过</div>
				<div class="inputContentInput1" v-if="status==2">未通过</div>

			</div>
			<div class="inputContent" v-if="remark">
				<div class="inputContentText l">拒绝理由：</div>
				<Input class="inputContentInput" v-model="name" placeholder="请输入理由"></Input>
			</div>

			<div class="inputContent">
				<div class="inputContentText l">用户名称：</div>
				<Input class="inputContentInput" v-model="name" placeholder="请输入名称"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">真是姓名：</div>
				<Input class="inputContentInput" v-model="userName" placeholder="请输入姓名"></Input>
			</div>

			<div class="inputContent">
				<div class="inputContentText l">身份证号：</div>
				<Input class="inputContentInput" v-model="idCard" placeholder="请输入身份证号"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">邮箱：</div>
				<Input class="inputContentInput" v-model="email" placeholder="请输入邮箱"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">电话：</div>
				<Input class="inputContentInput" v-model="phone" placeholder="请输入姓名"></Input>
			</div>

			<div class="inputContent">
				<div class="inputContentText l">身份证正面：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess1">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<img class="inputImg" :src="img1" />
			</div>
			<div class="inputContent">
				<div class="inputContentText l">身份证反面：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess2">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<img class="inputImg" :src="img2" />
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
				status: 0,
				name: '', //真是姓名
				phone: '',
				email: '',
				userName: '', //用户名称
				img1: '', //上传图片
				img2: '', //上传图片
				phone: '', //联系电话
				idCard: '',
				id: '',
				urlId: '',
				remark: ''

			};
		},
		store,
		beforeCreate: function() {

		},
		created: function() {

			this.urlId = this.$route.query.id;
			let vm = this;

			if(this.urlId) {
				vm.gitData(vm.urlId)
			}
			this.getUrl = this.http + "/api/klp/setImg"
			//			this.getClass();
		},

		methods: {
			ok() {
				let vm = this;
				let data = qs.stringify({
					id: vm.urlId,
					status: 1
				});
				vm.$http({
						url: vm.http + "/api/user/userUpload",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;
						if(res.data.code == 200) {
							vm.$Message.info("ok");
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
			no() {
				let vm = this;
				//				vm.remark='就是不让你过'
				let data = qs.stringify({
					id: vm.urlId,
					status: 2,
//					remark: vm.remark
				});
				vm.$http({
						url: vm.http + "/api/user/userUpload",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;
						if(res.data.code == 200) {
							vm.$Message.info("ok");
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

			submitAll() {
				let vm = this;
				if(vm.name == "") {
					this.$Message.error('姓名不能为空');
					return false;
				}
				if(vm.userName == "") {
					this.$Message.error('姓名不能为空');
					return false;
				}
				if(vm.idCard == "") {
					this.$Message.error('身份证号不能为空');
					return false;
				}
				if(vm.email == "") {
					this.$Message.error('邮箱不能为空');
					return false;
				}
				if(vm.phone == "") {
					this.$Message.error('电话不能为空');
					return false;
				}

				if(vm.img1 == "") {
					this.$Message.error('图片1不能为空');
					return false;
				}
				if(vm.img2 == "") {
					this.$Message.error('图片2不能为空');
					return false;
				}

				let data = qs.stringify({
				
					name: vm.name, //姓名
					email: vm.email,
					nameAll: vm.userName,
					cardImg1: vm.img1,
					cardImg2: vm.img2,
					phone: vm.phone,
					idCard: vm.idCard,
		
				});

				vm.$http({
						url: vm.http + "/api/user/userSet",
						method: "post",
						data: data,
					})
					.then(res => {

						if(res.data.code == 200) {
							vm.$Message.success("发布成功");

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
			handleSuccess1(res, file) {
				console.log(res, file)
				this.img1 = res.img
				//				alert(res.img)

			},
			handleSuccess2(res, file) {
				console.log(res, file)
				this.img2 = res.img
				//				alert(res.img)

			},
			handleSuccess3(res, file) {
				console.log(res, file)
				this.img3 = res.img
				//				alert(res.img)

			},
			gitData(id) {
				let vm = this;
				let data = qs.stringify({
					id: id,
				});
				vm.$http({
						url: vm.http + "/api/user/userDetail",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;
						if(res.data.code == 200) {
							vm.id = res.data.data.id
							vm.name = res.data.data.user
							vm.userName = res.data.data.nameAll
							vm.img1 = res.data.data.cardImg1
							vm.img2 = res.data.data.cardImg2
							vm.phone = res.data.data.phone
							vm.idCard = res.data.data.idCard
							vm.email = res.data.data.email
							vm.status = res.data.data.userStatus;
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

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import "../../assets/css/userA.css";
</style>