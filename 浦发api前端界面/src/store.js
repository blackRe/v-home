//import Vue from 'vue';
//import Vuex from 'vuex';
//Vue.use(Vuex);
//
//const state = {
//	count: 2018
//}
//export default new Vuex.Store({
//	state
//});



import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//const state = {
//	count: 2018
//}
export default new Vuex.Store({
	state: {　 //state数据跟根组件data写法一模一样。也是储存数据的。
		　　
		count: 2018,
		　　a: 20
	},
	actions: {
		//actions里面全是方法，与mutations区别只有这儿的方法可以使用异步操作
		inc: state => state.count++,
		dec: state => state.count--
	},
	mutations: {　　　　　　　　　　　　　　 //此处的function是同步操作的。
		　　
		add(state, n) {}　　　　　　　　　　 //参数跟actions一样。
	},
	getters: {　　　　　　　　　
		　　　　　 //　这个跟组件的computed差不多，接收state作为参数，不接受组件传参数。需要return值。
		c(state) {　　　　
			state.a += 1　　　　　　　　　　　　
			return state.a--　　　　　　　　　
		}

	}

});