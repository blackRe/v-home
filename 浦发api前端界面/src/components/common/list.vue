<template>
	<!-- <div class="list-content"> -->

	<div class="menu">

		<Menu :theme="theme3" :active-name="id" :open-names="[openId]" @on-select='meun_open' style="width:150px;">

			<Submenu name="1">
				<template slot="title">
					平台首页
				</template>

			</Submenu>
			<Submenu name="2">
				<template slot="title">
					商城管理
				</template>
				<MenuItem name="2-1">商城列表</MenuItem>
				<MenuItem name="2-2">产品发布</MenuItem>
				<!--<MenuItem name="2-3">活跃用户</MenuItem>-->
			</Submenu>
			<Submenu name="3">
				<template slot="title">
					订单管理
				</template>
				<MenuItem name="3-1">订单列表</MenuItem>
				<MenuItem name="3-2">订单详情</MenuItem>
			</Submenu>
			<Submenu name="4">
				<template slot="title">
					用户管理
				</template>
				<!--<MenuItem name="4-1"></MenuItem>-->
				<MenuItem name="4-1">用户新增</MenuItem>
				<MenuItem name="4-2">卖家审批</MenuItem>
				<MenuItem name="4-3">用户权限</MenuItem>
				
			</Submenu>
			<Submenu name="5">
				<template slot="title">
					消息管理
				</template>
				<!--<MenuItem name="4-1"></MenuItem>-->
				<MenuItem name="5-1">邮件发布</MenuItem>
				<MenuItem name="5-2">公告管理</MenuItem>
			</Submenu>
		</Menu>

		<br>
	</div>
	<!-- </div> -->
</template>
<style scoped>
	/*@import "../../assets/css/userAdd.css";*/
	
	.menu {
		width: 150px;
		height: 600px;
		/*background:rgb(0, 102, 153);*/
		/*color: #ffffff;*/
		/*text-align: center;*/
		overflow: hidden;
	}
	
	.menu .mainTheme {
		width: 100%;
		height: 80px;
		line-height: 80px;
	}
	
	.menu .mainTheme .ivu-menu {
		/*background:rgb(0, 102, 153);*/
		/*color: #ffffff;*/
	}
</style>

<script>
	export default {
		data() {
			return {
				theme3: 'dark',
				id:'',
				openId:'',
			}
		},
		beforeMount: function() {
			this.id=localStorage.getItem('id');
			this.openId=localStorage.getItem('openId');
			this.meun_open(localStorage.getItem('id'))
		},
		watch:{
			$route(ol,dl){
//				this.meun_open(ol.path)
			}
		},
		methods: {
			meun_open(name) {
				switch(name) {
					case '2-1':
						this.$router.push('/listAll')
						localStorage.setItem('id','2-1');
						localStorage.setItem('openId','2');
						break;
					case '2-2':
						this.$router.push('/addList')
						localStorage.setItem('id','2-2');
						localStorage.setItem('openId','2');
						break;
					case '3-1':
						this.$router.push('/orderList')
						localStorage.setItem('id','3-1');
						localStorage.setItem('openId','3');
						break;
					case '3-2':
						this.$router.push('/orderDetail')
						localStorage.setItem('id','3-2');
						localStorage.setItem('openId','3');
						break;
					case '4-1':
						this.$router.push('/userindex')
						localStorage.setItem('id','4-2');
						localStorage.setItem('openId','4');
						break;
					case '4-2':
						this.$router.push('/userList')
						localStorage.setItem('id','4-2');
						localStorage.setItem('openId','4');
						break;
						case '4-3':
						this.$router.push('/permissions')
						localStorage.setItem('id','4-2');
						localStorage.setItem('openId','4');
						break;
						
						case '5-1':
						this.$router.push('/message')
						localStorage.setItem('id','5-1');
						localStorage.setItem('openId','5');
						break;
						case '5-2':
						this.$router.push('/notive')
						localStorage.setItem('id','5-2');
						localStorage.setItem('openId','5');
						break;
					default:
						break;
				}
			}

		}

	}
</script>