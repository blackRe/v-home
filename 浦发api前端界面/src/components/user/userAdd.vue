<template>
	<div class="user">
		<div class="boxList">
			头像
		</div>
		<div class="boxList">
			<div class="boxText l">
				昵称：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				用户名：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				性别：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				生日：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				电子邮箱：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				联系地址：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				真实姓名：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				身份证号：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>

		<div class="boxList">
			<div class="boxText l">
				qq：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
		<div class="boxList">
			<div class="boxText l">
				微信：
			</div>
			<Input class="getData" v-model="user" placeholder="请输入姓名"></Input>
		</div>
	</div>

</template>
<style scoped>
	@import "../../assets/css/userAdd.css";
</style>

<script>
	export default {
		data() {
			return {
				theme3: 'dark',
				user: '12',
			}
		},
		beforeMount: function() {

		},

		methods: {
			showData(){
				
			}
		},

	}
</script>