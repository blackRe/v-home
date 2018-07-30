<template>
	<div id="app">
		<div class="app_content">
			<!--判断title和左侧菜单是否显示-->
			<headTitle v-show='urlData==1'></headTitle>
			<leftView class='l' v-if='urlData==1'></leftView>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import leftView from './components/common/list.vue';
	import headTitle from '@/components/common/head'
	export default {
		name: 'App',
		data() {
			return {
				urlData: 1, // 用于判断是否显示左侧导航
			}
		},
		beforeMount() {
			//			利用路由判断显示与否
			this.urla()
		},
		methods: {

			urla: function() {
				let vm = this;
				if(this.$route.path == '/demo' || this.$route.path == '/changepassword' || this.$route.path == 'changepasswordtowo' || this.$route.path == '/process' || this.$route.path == '/admin') {
					vm.urlData = 2;

				} else {

					vm.urlData = 1;
				}
			}
		},
		watch: {
			$route(ol, dl) {
				this.urla()
			}
		},
		components: {
			headTitle,
			leftView,

		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
		/*margin-top: 60px;*/
		/*margin: auto;*/
	}
	
	#app .app_content {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
	}
	
	#app .leftView {
		width: 240px;
	}
</style>