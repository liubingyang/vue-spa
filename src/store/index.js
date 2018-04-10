
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		count:0,
		loadingSwitch:false,
		arrList:[],
		searchInfo:{},
	},
	mutations:{
		increment(state){
			state.count++
		},
		loadingShow(state){
			state.loadingSwitch=true
		},
		loadingHide(state){
			state.loadingSwitch=false
		},

	},
	getters:{
		dcount:state=>state.count*2
	}
})