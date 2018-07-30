<template>
	<div class="box">
		<div class="lun_bo">
			<h1>
			    	个人展示
		    </h1>
			<Carousel v-model="value1" loop>
				<CarouselItem>
					<img class="demo-carousel" :src="listData.img" alt="">
				</CarouselItem>
				<!--<CarouselItem>
					<img class="demo-carousel" :src="listData.src2" alt="">
				</CarouselItem>
				<CarouselItem>
					<img class="demo-carousel" :src="listData.src3" alt="">
				</CarouselItem>-->
			</Carousel>
		</div>
		<div class="xiangqing">
			<div class="">
				<div class="name">
					姓名：{{listData.name}}
				</div>
				<!--<div class="idCred">
					身份证：{{listData.idcord}}；
				</div>-->
				<div class="age">
					年龄：{{listData.age}}
				</div>
				<div class="detail">
					简介：{{listData.detail}}
				</div>
				<div id="">
					工作年限:{{listData.year}}
				</div>
				<div class="detail">
					联系他扣扣，{{listData.qq}}
				</div>
				<div class="detail">
					联系他微信{{listData.chart}}
				</div>
				<div class="detail">
					电话联系{{listData.phone}}
				</div>

			</div>
		</div>

	</div>
</template>
<script>
	import axios from "axios";
	var qs = require("qs");
	export default {
		data() {
			return {
				value1: 0,
				id:'',//关联id
				listData:''
				
			}
		},
		 beforeMount: function() {
    			this.id=this.$route.query.id;
    			alert(this.$route.query.id)
			this.gitData(this.$route.query.id);
		 },
		
		methods: {
			gitData(id) {
				let vm = this;
				let data = qs.stringify({
					id:id,
				});
				vm.$http({
					url: vm.http+"/api/klp/classDetail",
						
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res,'详情')
						if(res.data.code == 200) {
							vm.$Message.success("数据获取成功");
							vm.listData = res.data.data;
							//							alert(9)
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

	}
</script>
<style>
	@import "../../assets/css/listDetail.css";
</style>