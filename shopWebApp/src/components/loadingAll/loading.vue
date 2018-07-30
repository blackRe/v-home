<template>
	<div class="contentBox">
		<div class="content">
			<img class="content_list" src="../../assets/img/one.png" />
			
			<div class="userName">
				账户：<input type="text" class="userInput" placeholder="请输入用户名"v-model="username" />
			</div>
			<div id=""class="userPwd">
				密码：<input class="userPwd" type="password" placeholder="请输入密码" />
			</div>
			<div class="tijiao">
				<mt-badge class="tijiao" size="small" @click="goAll">提交</mt-badge>
			</div>
			<div class="tijiao">
				<span class="modify">
					修改密码
				</span>
				<span class="registered r">
					注册账户
				</span>
			</div>
			
			
		</div>
	</div>
</template>
<script>
	import axios from "axios";

	export default {
		data() {
			return {
				msg: "欢迎进入浦发银行网站",
				valueOne: "klp",
				valueTwo: "551319",
				modal1: false,
				username: '',
				password: '',
				userData: []
			};
		},
		beforeCreate: function() {

		},
		created: function() {},

		methods: {
			
			goList() {
				let vm = this;
				let data = qs.stringify({
					name: vm.valueOne,
					pwd: vm.valueTwo
				});
				vm.$http({
						url: vm.http + "/api/shop/loginAll",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, '坡坡上大幅减速电机你是');
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
		
			ceshi(){
				let data = [{
						name: 'klp1',
						email: '10645@qq.com',
						purl: '12312/baidu.com',
						appId: '90',
						client_id: '11213a_bcsuee_de'
					},
					{
						name: 'klp2',
						email: '10645@qq.com',
						purl: 'ceshi',
						appId: '99',
						client_id: '123'
					},
					{
						name: '111klp',
						email: 'we2210645@qq.com',
						purl: '123qweqas/baidu.com',
						appId: '345',
						client_id: 'wqeqa_bcsuee_de'
					},
					{
						name: 'klp',
						email: 'wes210645@qq.com',
						purl: '/baidu.com',
						appId: '12',
						client_id: 'qweqea_bcsuee_de'
					},
					{
						name: 'klp4',
						email: '11110645@qq.com',
						purl: '123131/baidu.com',
						appId: '123qwe',
						client_id: '12312a_bcsuee_de',
						apiName: '测试数据Api4'
					}
				]
				let vm = this;
				let dataArray = data;
				let allDataObj = {};
				for(let i = 0; i < dataArray.length; i++) {
					if(allDataObj[data[i].email] == null) {
						let tempEmail = {};
						tempEmail.email = dataArray[i].email;
						let tempApi = {};
						tempApi.apiName = dataArray[i].apiName
						tempApi.client_id = dataArray[i].client_id
						tempApi.purl = dataArray[i].purl
						var tempApp = {};
						tempApp.name = dataArray[i].name;
						tempApp.client_id = dataArray[i].client_id;
						tempApp.apis = [];
						tempApp.apis.push(tempApi);
						//组装数据
						tempEmail.apps = {};
						tempEmail = tempApp;
						allDataObj = tempEmail;
						allDataObj[dataArray[i].email] = tempEmail;
					} else {
						let tempEmail = allDataObj[dataArray[i].email]
						var tempApi = {};
						tempApi.apiName = dataArray[i].apiName
						tempApi.client_id = dataArray[i].client_id
						tempApi.purl = dataArray[i].purl
						if(tempEmail.apps[dataArray[i].client_id] == null) {
							var tempApp = {};
							tempApp.name = dataArray[i].name;
							tempApp.client_id = dataArray[i].client_id;
							tempApp.apis = [];
							tempApp.apis.push(tempApi);
							tempEmail.apps[dataArray[i].client_id] = tempApp
						} else {
							if(tempEmail.apps[dataArray[i].client_id].apis == null) {
								tempEmail.apps[dataArray[i].client_id].apis = []
							}
							tempEmail.apps[dataArray[i].client_id].apis.push(tempApi)
						}
					}
				}
				if(allDataObj!=null){
					for(var key in allDataObj){
						var tempApps=allDataObj[key].apps;
						if(tempApps!=null){
							var tempAppAry=[];
							for(tempApp in tempApps){
								tempAppAry.push(tempApps[tempApp])
							}
							allDataObj[key].apps=tempAppAry;
						}
						allData.push(allDataObj[key])
						
					}
					
				}
				console.log('处理后的数据',allDataObj)
				
				
			
			
			}
		}
	};
</script>
<style scoped>
	@import "../../assets/css/loading.css";
</style>