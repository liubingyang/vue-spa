<template>
  <div id="app">
	  <div class="clearfix wrap">
	  	<div class="app_left fl">
	    	<ul class="nav">
	      		<li><router-link to="/">首页</router-link></li>
	      		<li><router-link to="/forum">魔兽论坛</router-link></li>
	    	</ul>
	    	<vue-loading v-show='loadingSwitch' type="cylon" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
	    	 <!-- 'balls', 'bars', 'beat', 'bubbles', 'cylon', 'spin', 'spiningDubbles', 'barsCylon' -->
	    	<router-view></router-view>
	    </div>
	    <div class="app_aside fr">
	    	{{msg}}
	    </div>
	  </div>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
export default {
  name: 'app',
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App'
  		}
	},
	computed:{
		//loading 开关
		loadingSwitch(){
			return this.$store.state.loadingSwitch
		}
	},
	components:{
      vueLoading
    }
}
</script>

<style lang="scss">
@import "./common/reset.css";
@import './common/base.css';
.wrap{
	min-height: 100%;
	background: #eee;
}	
.app_left{
	width: 80%;
	background: white;
	min-height:100vh;
	box-shadow: -1px 0 0 0 #ccc inset;
	.nav{
		width:200px;
		margin:40px auto 0;
		li{
			display: inline-block;
			padding: 5px 10px;
			margin:0 5px;
		}
	}
}
.app_aside{
	width: 20%;
}
</style>
