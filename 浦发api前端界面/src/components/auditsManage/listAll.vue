<template>
	<div class="contentBox">
		<div class="contentList l" v-for="data in listData" @click="goDetail(data.id)">
			<div class="up_img_list_all">
				<img :src="data.img" class="img" alt="">
			</div>
			<div class="detail">
				<div class="detail_name">姓名<span>{{data.age}}</span></div>
				<div class="detail_text">简介 <span>{{data.detail}}</span> </div>
				<!--<div class="detail_money">工作年限 <span>{{data.year}}</span></div>-->
				<div class="detail_money">税率 <span>{{data.number}}</span></div>
				<div class="address">所在地区 <span>{{data.province}}/{{data.ctiy}}</span></div>
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
				modal1: false,
				listData: '',

			};
		},
		store,
		beforeCreate: function() {
			
		},
		created: function() {
			this.goList();
		},

		methods: {
			goDetail(id) {
				this.$router.push({
					path: '/addList',
					query: {
						id: id
					}
				})
			},
			verificationPicFile(file) {
				//				console.log(file)
				var filePath = file.target.files[0];
				if(filePath) {
					//读取图片数据  
					var filePic = file.target.files[0];
					var reader = new FileReader();
					reader.onload = function(e) {
						var data = e.target.result;
						//加载图片获取图片真实宽度和高度  
						var image = new Image();
						image.onload = function() {
							var width = image.width;
							var height = image.height;
							//							alert(width)
							//							if(width <= 720 || height >= 1280) {
							if(width <= 720) {
								alert("文件尺寸符合！");
							} else {
								alert("文件尺寸应为：720*1280！文件大小已经超出");
								file.value = "";
								return false;
							}
						};
						image.src = data;
					};
					reader.readAsDataURL(filePic);
				} else {
					return false;
				}
			},

			registered() {
				this.$router.push("registered");
				this.$store.state.count = 2019;

			},
			changePassword() {
				this.$router.push("changepassword");
			},
			goList() {
				let vm = this;
				vm.$http({
						url: vm.http+"/api/klp/list",
						method: "post",
						data: '',
					})
					.then(res => {
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
	@import "../../assets/css/listAll.css";
</style>