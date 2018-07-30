<template>
	<div class="contentBox">
		<div class="content">
			<div class="goAll">登陆{{$store.state.count}}</div>
			<div class="loade_text">
				<div class="account">
					<Input v-model.trim="valueOne" placeholder="请输入账户" style="width: 300px"></Input>
				</div>
				<div class="pwd">
					<Input v-model.trim="valueTwo" type="password" placeholder="请输入密码" style="width: 300px"></Input>
				</div>
				<div class="ok">
					<Button class="okBtn" type="success" @click="goList">登陆</Button>
				</div>
				<div class="forgotPassword">
					<span class="forgotPwd" @click="changePassword">忘记密码</span>
					<span class="registered" @click="registered">注册</span>
				</div>

			</div>
			<Modal v-model="modal1" class-name="vertical-center-modal" @on-ok="CancelTheOk">
				<div slot="header" style="height: 20px;"></div>
				<p style="line-height: 60px;text-align: center;">确认完成订单？</p>
			</Modal>
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
				valueOne: "klp",
				valueTwo: "551319",
				modal1: false
			};
		},
		store,
		beforeCreate: function() {
			this.valueOne={a:'1'}
			console.log(this.valueOne)
			console.group("beforeCreate 创建前状态===============》");
		},
		created: function() {
//			alert(this.$route.path)
			if(this.$route.path=='/admin'){	
//				alert('ppp')
				
			}
			console.group("created 创建完毕状态===============》");
		},
		
		methods: {
			registered() {
				this.$router.push("registered");
				this.$store.state.count=2019;
				
			},
			changePassword() {
				this.$router.push("changepassword");
			},
			goList() {
				let vm = this;
				vm.$store.state.count=2019;
			
//				if(vm.valueOne == "") {
//					this.$Message.error("用户名不能为空");
//					return false;
//				}
//				if(vm.valueOne.length < 6) {
//					this.$Message.error("用户名不能少于6位");
//					return false;
//				}
//
//				if(vm.valueTwo == "") {
//					this.$Message.error("密码不能为空");
//					// vm.warning(true);
//					return false;
//				}
//				if(vm.valueTwo.length < 6) {
//					this.$Message.error("密码长度大于6位");
//					// vm.warning(true);
//					return false;
//				}
				//   vm.modal1 = true;
				//   转换
//				console.log('测试'+vm.valueTwo)
//				
//				return ;
				let data = qs.stringify({
					name: vm.valueOne,
					pwd: vm.valueTwo
				});
				vm.$http({
						url:vm.http+ "/api/shop/loginAll",
						method: "post",
						data: data,
//						headers: {
//							"Content-Type": "application/x-www-form-urlencoded"
//						},
//						withCredentials: true
					})
					.then(res => {
						console.log(res,'坡坡上大幅减速电机你是');
						console.log(res.data.status);
						if(res.data.code == 200) {
							vm.$Message.success("账户活这密码输入正确");
							this.$router.push("listAll");
						} else {
							vm.$Message.error("账户活这密码错误");
						}
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

Add "scoped" attribute to limit CSS to this component only 
<style scoped>
	@import "../../assets/css/loading.css";
</style>
	
	