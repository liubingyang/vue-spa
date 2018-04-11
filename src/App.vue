<template>
  <div id="app">
	  <div class="clearfix wrap">
	  	<div class="app_left fl">
	    	<ul class="nav">
	      		<li><router-link to="/">首页</router-link></li>
	      		<li @click="$store.commit('forumShowStepControl',1)"><router-link to="/forum">魔兽论坛</router-link></li>
	    	</ul>
	    	<vue-loading v-show='loadingSwitch' type="cylon" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
	    	 <!-- 'balls', 'bars', 'beat', 'bubbles', 'cylon', 'spin', 'spiningDubbles', 'barsCylon' -->
	    	<router-view></router-view>
	    </div>
	    <div class="app_aside fr">
	    	<div class="openingTime">
	    		已开服：{{openingTime}}
	    	</div>
	    	<!-- 客户端登录信息 -->
	    	<browserInfo></browserInfo>	
	    </div>
	  </div>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import browserInfo from'./views/browserInfo'
export default {
  name: 'app',
  	data () {
    	return {
      		openingTime:'',
  		}
	},
	computed:{
		//loading 开关
		loadingSwitch(){
			return this.$store.state.loadingSwitch
		}
	},
	components:{
      vueLoading,
      browserInfo
    },
    created(){
    	this.getServerTime();
    },
    methods:{
    	getServerTime(){
    		this.$http.get('http://localhost:3000/openingTime').then(data=>{
    		let openingTime=Number(data.body);
    		setInterval(()=>{
	    		openingTime+=100;
				let days = parseInt(openingTime / (1000 * 60 * 60 * 24));
	       	 	let hours = parseInt((openingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	        	let minutes = parseInt((openingTime % (1000 * 60 * 60)) / (1000 * 60));
	        	let seconds = ((openingTime % (1000 * 60)) / 1000).toFixed(1);
	        	this.openingTime=days+'天 '+hours+'小时 '+minutes+'分 '+seconds+'秒'
	    		},100)
    		})
    	},  	
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
	width: 75%;
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
	width: 25%;
	.openingTime{
		text-align: center;
		font-size: 14px;
		color:green;
		line-height: 30px;
		margin-top:20px;
	}
}

</style>
