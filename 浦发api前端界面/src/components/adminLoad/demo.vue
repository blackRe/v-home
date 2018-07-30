<template>
	<div class="contentBox">
		<div class="content">
			<Carousel v-model="value1" loop>
				<CarouselItem>
					<div class="demo-carousel" :style="'width:'+outDataWidth+'px'">
						<div ref='abc' class="l" style="padding: 10px;" v-for="data in outData">{{data}}</div>
					</div>
				</CarouselItem>
			</Carousel>
			<!--<ul class="ase"  :style="'width:'+outDataWidth+'px'">
				<li ref='abc' class="l" style="padding: 20px;display: block;" v-for="data in outData" >{{data}}</li>
			</ul>-->
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
				value1: 0,
				msg: "欢迎进入浦发银行网站",
				valueOne: "klp",
				valueTwo: "5513191",
				modal1: false,
				outData: [111, 222222, 331, 12, 1322, 90, 98, 9777, 200, 899],
				outDataWidth: 0,
			};
		},
		mounted() {
			var dataArray = []
			var b = []
			var widthAll = 0
			for(var i = 0; i < this.outData.length; i++) {
				widthAll += this.$refs.abc[i].getBoundingClientRect().width * 1
				if(widthAll > 410) {
//					b.a[i] = this.outData[i]x
				} else {
//					b.a1[i] = this.outData[i]
				}
				dataArray.push(this.$refs.abc[i].getBoundingClientRect().width)
			}
			console.log(b, "b")

			this.outDataWidth = this.outData.length * this.$refs.abc[0].getBoundingClientRect().width / 2
		},

		methods: {

		}
	};
</script>

<style scoped>
	.demo-carousel {
		height: 120px;
	}
	
	.content {
		width: 200px;
		height: 120px;
		border: 1px solid red;
	}
	
	.ase {
		border: 1px solid orange;
		height: 120px;
	}
</style>