<template>
	<div class="boxImg">
		<img src="../../assets/img/pb.jpeg" />
		<div class="overTime">
			{{timeDsc}}<span class="time_s">s</span>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				timeDsc: 3

			};
		},

		beforeMount: function() {
			this.timeAll()
		},

		methods: {
			timeAll() {
				let vm = this;
				let times=setInterval(function() {
					vm.timeDsc--;
					if(vm.timeDsc == 0) {
						
						clearInterval(times)
						vm.$router.push("loading");
					}
				}, 1000)
			},
		}
	};
</script>

<style scoped="scoped">
	.boxImg {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}
	
	.boxImg img {
		width: 100%;
	}
	
	.overTime {
		border: 1px solid #09e;
		width: .4rem;
		height: .4rem;
		text-align: center;
		line-height:.4rem;
		border-radius: 50%;
		background: #fff;
		font-weight: bold;
		font-size: .14rem;
		position: absolute;
		top: 20px;
		right: 20px;
	}
	.time_s{
	font-size: .12rem;
	}
</style>