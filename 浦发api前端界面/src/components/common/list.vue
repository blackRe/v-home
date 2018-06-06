<template>
	<!-- <div class="list-content"> -->

	<div class="menu">

		<Menu :theme="theme3" active-name="2-1" :open-names="['2']" @on-select='meun_open' style="width:150px;">

			<Submenu name="1">
				<template slot="title">
					平台首页
				</template>

			</Submenu>
			<Submenu name="2">
				<template slot="title">
					用户管理
				</template>
				<MenuItem name="2-1">用户列表</MenuItem>
				<MenuItem name="2-2">用户发布</MenuItem>
				<!--<MenuItem name="2-3">活跃用户</MenuItem>-->
			</Submenu>
			<Submenu name="3">
				<template slot="title">
					订单状态
				</template>
				<MenuItem name="3-1">订单列表</MenuItem>
				<MenuItem name="3-2">发布订单</MenuItem>
			</Submenu>
			<Submenu name="4">
				<template slot="title">
					账户设置
				</template>
				<!--<MenuItem name="4-1"></MenuItem>-->
				<MenuItem name="4-1">账户详情</MenuItem>
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
				theme3: 'dark'
			}
		},
		beforeMount: function() {

		},

		methods: {
			meun_open(name) {
				switch(name) {
					case '2-1':
						this.$router.push('listAll')
						break;
					case '2-2':
						this.$router.push('addList')
						break;
					case '3-1':
						this.$router.push('orderList')
						break;
					case '3-2':
						this.$router.push('orderDetail')
						break;
						case '4-1':
						this.$router.push('userindex')
						break;
					default:
						break;
				}
			}

		}

	}
</script>