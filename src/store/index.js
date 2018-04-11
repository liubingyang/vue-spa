
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		count:0,
		loadingSwitch:false,
		arrList:[],
		searchInfo:{},
		forumShowStep:1,
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
		forumShowStepControl(state,val){
			state.forumShowStep=val||1
		}

	},
	getters:{
		dcount:state=>state.count*2
	}
})