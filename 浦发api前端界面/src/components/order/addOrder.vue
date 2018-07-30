<template>
	<div class="contentBox">
		<div class="addText">
			数据添加
			<Button class="r" type="primary" @click="submitAll">发布</Button>
		</div>
		<div class="addInput">
			<div class="inputContent">
				<div class="inputContentText l">订单状态：</div>
				<div class="inputContentInput1 " v-if="status==0">未完成</div>
				<div class="inputContentInput1" v-if="status==1">已完成</div>
				<div class="inputContentInput1" v-if="status==2">待付款</div>
				<div class="inputContentInput1" v-if="status==3">已付款</div>
				<div class="inputContentInput1" v-if="status==4">已退款</div>
				<div class="inputContentInput1" v-if="status==5">取消退款</div>
				<!--<div class="inputContentInput" v-if="status==6">已完成</div>-->
				
				<!--<Input class="inputContentInput" v-model="name" placeholder="请输入姓名"></Input>-->
			</div>
			<div class="inputContent">
				<div class="inputContentText l">名称：</div>
				<Input class="inputContentInput" v-model="name" placeholder="请输入姓名"></Input>
			</div>
			
			<div class="inputContent">
				<div class="inputContentText l">订单号：</div>
				<Input class="inputContentInput" v-model="orderNumber" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">库存数量：</div>
				<Input class="inputContentInput" v-model="count" placeholder="请输入数量"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品价格：</div>
				<Input class="inputContentInput" v-model="price" placeholder="请输入姓名"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品分类：</div>
				<Select v-model="classData" class="inputContentInput">
					<Option v-for="item in classArrray" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>

			<div class="inputContent">
				<div class="inputContentText l">产品单位：</div>
				<Select v-model="unit" class="inputContentInput">
					<Option v-for="item in unitData" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">折扣活动：</div>
				<InputNumber class="inputContentInput" v-model="discount" :max="10" :min="1" :step="1.2"></InputNumber>

			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品图片1：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess1">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<img class="inputImg" :src="img1" />
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品图片2：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess2">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<img class="inputImg" :src="img2" />
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品图片3：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess3">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
				<img class="inputImg" :src="img3" />

			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品视屏：</div>
				<Upload :action="getUrl" name="files" :on-success="handleSuccess1">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
				</Upload>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">快递费用：</div>
				<Input class="inputContentInput" v-model="deliveryPrice" placeholder="请输入价格"></Input>
				<span id="">元</span>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产地省：</div>
				<Input class="inputContentInput" v-model="province" placeholder="请输入价格"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产地市：</div>
				<Input class="inputContentInput" v-model="ctiy" placeholder="请输入价格"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">店铺地址：</div>
				<Input class="inputContentInput" v-model="store" placeholder="请输入地址"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">相关宝贝：</div>
				<Input class="inputContentInput" v-model="baby" placeholder="请输入地址"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">联系电话：</div>
				<Input class="inputContentInput" v-model="phone" placeholder="请输入电话"></Input>
			</div>
			<div class="inputContent">
				<div class="inputContentText l">产品详情：</div>
				<Input class="inputContentInput" v-model="detail" placeholder="请输入地址"></Input>
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
				status:'',//订单状态
				orderNumber:'',//订单号
				urlId: '',
				id: '',
				baby: '', //baobei
				store: '', //店铺地址
				name: '', //姓名
				detail: '', //简介
				price: '', //单价
				classArrray: [],
				deliveryPrice: 0, //快递费用
				img1: '', //上传图片
				img2: '', //上传图片
				img3: '', //上传图片
				phone: '', //联系电话
				qq: '', //qq
				chart: '', //微信
				province: '', //省
				ctiy: '', //市	
				count: 1, //
				classData: '', //分类
				discount: 0, //折扣
				discountData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //折扣可以不选默认无折扣
				unit: '', //单位
				unitData: ['元/斤', '元/Kg'],
				id: ''

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
			this.getClass();
		},

		methods: {
			getClass() {
				let vm = this;
				vm.$http({
						url: vm.http + "/api/shop/classAll",
						method: "post",
						data: '',
					})
					.then(res => {
						let a = res.data.data.class;
						vm.classArrray = a.split(",")
					})
					.catch(err => {
						vm.$Message.error("网络错误");

						//							this.$router.push("list");
					});
			},
			submitAll() {
				let vm = this;
				if(vm.name == "") {
					this.$Message.error('姓名不能为空');
					return false;
				}
				if(vm.count == "") {
					this.$Message.error('数量不能为空');
					return false;
				}

				if(vm.price == "") {
					this.$Message.error('单价不能为空');
					return false;
				}

				if(vm.unit == "") {
					this.$Message.error('单位不能为空');
					return false;
				}
				if(vm.classData == "") {
					this.$Message.error('分类不能为空');
					return false;
				}

				if(vm.discount == "") {
					this.$Message.error('折扣价格不能为空');
					return false;
				}
				if(vm.class == "") {
					this.$Message.error('产品分类不能为空');
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
				if(vm.img3 == "") {
					this.$Message.error('图片3不能为空');
					return false;
				}
				if(vm.deliveryPrice == "") {
					this.$Message.error('快递费用不能为空');
					return false;
				}

				if(vm.province == "") {
					this.$Message.error('产地身份不能为空');
					return false;
				}
				if(vm.ctiy == "") {
					this.$Message.error('产地市不能为空');
					return false;
				}
				if(vm.phone == "") {
					this.$Message.error('电话不能为空');
					return false;
				}
				if(vm.store == "") {
					this.$Message.error('店铺地址不能为空');
					return false;
				}
//				if(vm.video == "") {
//					this.$Message.error('视屏不能为空');
//					return false;
//				}
				if(vm.detail == "") {
					this.$Message.error('描述不能为空');
					return false;
				}

				let str = ""
				let data = ""

				if(vm.urlId) {
					data = qs.stringify({
						id: vm.id,
						name: vm.name, //姓名
						count: vm.count, //数量
						price: vm.price, //单价
						unit: vm.unit, //单价
						class1: vm.classData,
						discount: vm.discount, //折扣
						img1: vm.img1, //图片
						img2: vm.img2, //图片
						img3: vm.img3, //图片
						deliveryPrice: vm.deliveryPrice, //快递单费用
						province: vm.province, //省
						ctiy: vm.ctiy, //市
						store: vm.store, //店铺地址
						video: vm.video, //店铺视屏
						detail: vm.detail, //简介
						phone: vm.phone, //电话
						baby: vm.baby,
					});
					
					str = 'upload'
				} else {
					data = qs.stringify({
						name: vm.name, //姓名
						count: vm.count, //数量
						price: vm.price, //单价
						unit: vm.unit, //单价
						class1: vm.classData,
						discount: vm.discount, //折扣
						baby: vm.baby,
						img1: vm.img1, //图片
						img2: vm.img2, //图片
						img3: vm.img3, //图片
						deliveryPrice: vm.deliveryPrice, //快递单费用
						province: vm.province, //省
						ctiy: vm.ctiy, //市
						store: vm.store, //店铺地址
						video: vm.video, //店铺视屏
						detail: vm.detail, //简介
						phone: vm.phone, //电话
					});
					str = 'setShop'

				}

				vm.$http({
						url: vm.http + "/api/shop/" + str,
						method: "post",
						data: data,
					})
					.then(res => {

						if(res.data.code == 200) {
							vm.$Message.success("数据获取成功");

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
						url: vm.http + "/api/shop/classDetail",
						method: "post",
						data: data,
					})
					.then(res => {
						console.log(res, 'ressssss')
						let data = res.data.data;
						if(res.data.code == 200) {
							//							vm.getUrl=
							vm.id = data.id;
							vm.name = data.name; //姓名
							vm.count = data.count; //数量
							vm.price = data.price; //单价
							vm.unit = data.unit; //单价
							vm.discount = data.discount; //折扣
							vm.classData = data.class; //折扣
							vm.baby = data.baby
							vm.img1 = data.img1; //图片
							vm.img2 = data.img2; //图片
							vm.img3 = data.img3; //图片
							vm.deliveryPrice = data.deliveryPrice; //快递单费用
							vm.province = data.province; //省
							vm.ctiy = data.ctiy; //市
							vm.store = data.store; //店铺地址
							vm.video = data.video; //店铺视屏
							vm.detail = data.detail; //简介
							vm.phone = data.phone; //电话
							vm.orderNumber=data.orderNumber;
							vm.status=data.status
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
	
	@import "../../assets/css/addOrder.css";
</style>