<template>
	<div class="changePassword">

		<div class="change_content">
			<div class="changeText">修改密码</div>
			<div class="eMailAll">
				<Input v-model="eMail" placeholder="请输入您的邮箱" style="width: 300px"></Input>
			</div>
			<div class="verifyImage clear">
				<Input v-model="eMailImg" placeholder="输入图片验证" class="verifyImageInput l"></Input>
				<div class="verify l"><img class="validationImg" src="../../assets/img/login/yanzheng.png" alt=""></div>
			</div>

			<div class="getVerifyImage clear">
				<Input v-model="getVerify" placeholder="输入邮箱验证码" class="getVerifyImageInput l"></Input>
				<Button class="getSendBtn" type="success" @click="send">获取验证嘛</Button>
			</div>
			<div class="sendContent">
				<Button class="sendBtn" type="success" @click="sendOk">发送</Button>
			</div>
		</div>
	</div>
</template>
<script>
	var qs = require("qs");
	export default {
		data() {
			return {
				msg: "欢迎进入浦发银行网站",
				eMail: '',
				eMailImg: '',
				getVerify: '',
				modal1: false
			};
		},
		methods: {
			send() {
				let vm = this;
				if(vm.eMail == "") {
					vm.$Message.error("邮箱不能位空");
					return false;
				}
				if(!vm.eMailRex(vm.eMail)) {
					vm.$Message.error("邮箱输入错误");
					return false;
				}
				
				let data = qs.stringify({
					user_email: vm.eMail,
	
				});
				vm.$http({
						url: "/ajaxurl/api/user/getverify",
						method: "post",
						data: data,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						withCredentials: true
					})
					.then(res => {
						console.log(res);
						console.log(55555);
						if(res.data.code==200){
//							this.$router.push("apilist");
						}else{
							vm.$Message.error("账户活这密码错误");
						}
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
//							this.$router.push("list");
					});
				
				
				
//				if(vm.eMailImg == "") {
//					vm.$Message.error("图片验证码不能为空");
//					return false;
//				}

			
				//   不需要验证邮箱的验证密码
			},
			sendOk() {
				let vm = this;
				if(vm.eMail == "") {
					vm.$Message.error("邮箱不能位空");
					return false;
				}
				if(!vm.eMailRex(vm.eMail)) {
					vm.$Message.error("邮箱输入错误");
					return false;
				}
//				if(vm.eMailImg == "") {
//					vm.$Message.error("图片验证码不能为空");
//					return false;
//				}
				if(vm.getVerify == '') {
					vm.$Message.error("邮箱验证码不能为空");
					return false;
				}
				//   跳转
				let data = qs.stringify({
					user_email: vm.eMail,
					verify:vm.getVerify
				});
				vm.$http({
						url: "/ajaxurl/api/user/forget",
						method: "post",
						data: data,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						withCredentials: true
					})
					.then(res => {
						console.log(res);
						console.log(55555);
						if(res.data.code==200){
//							this.$router.push("apilist");
//alert(res.data.name)

   vm.$router.push({path:"/changepasswordtowo",query:{name:res.data.name}});
//								this.$router.push('changepasswordtowo')
						}else{
							vm.$Message.error("账户活这密码错误");
						}
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
//							this.$router.push("list");
					});
				
				
				
				
			},
			eMailRex(value) {
				var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
				return reg.test(value);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import "../../assets/css/changePassword.css";
</style>