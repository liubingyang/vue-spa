<!-- 展示服务器启动后不同浏览器登录的次数及最后登录时间 -->
<template>
	<div id='browserInfo' class="userInformations">
	    		<h3>用户统计：</h3>
	    		<ul>
	    			<li class="clearfix">
	    				<div class="kernel fl">内核</div>
	    				<div class="kernelNum fl">登录次数</div>
	    				<div class="lastLoadTime fr">最后登录时间</div>
	    			</li>
	    		</ul>
	    		<ul>
	    			<li class="clearfix" v-for='(v,k) in userInformations'>
	    				<div class="kernel fl">{{k}}</div>
	    				<div class="kernelNum fl text-center">{{v.count||0}}</div>
	    				<div class="lastLoadTime fr">{{v.lastLoadTime||0}}</div>
	    			</li>
	    	</ul>
	</div>
</template>
<script>
import Vue  from "vue";
export default {
	name:'browserInfo',
  	data () {
    	return {
      		userInformations:{},
  		}
	},
    created(){
    	this.getUserInformations();
    },
    methods:{
    	getUserInformations(){
    		this.$http.get('http://localhost:3000/userInformations').then(data=>{
    			let arr=data.body;
    			arr.forEach(v=>{
    				let u=v['user-agent'];
    				let a={
			           'IE内核': u.indexOf('Trident') > -1, //IE内核
			           'opera内核': u.indexOf('Presto') > -1, //opera内核
			           '苹果、谷歌内核': u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			           '火狐内核': u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			           '移动终端': !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			           'ios': !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			           android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			           iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone
			           iPad: u.indexOf('iPad') > -1, //是否iPad
			        };
			        for(let k in a){
			        	if(a[k]){
			        		if(this.userInformations[k]){
			        			this.userInformations[k].count++;
			        			this.userInformations[k].lastLoadTime=new Date(v.lastLoadTime).toLocaleString();
			        		}else{
			        			Vue.set(this.userInformations,k,{})
			        			Vue.set(this.userInformations[k],'count',1)
			        			Vue.set(this.userInformations[k],'lastLoadTime',new Date(v.lastLoadTime).toLocaleString())
			        		}
			        	}			   
			        }
    			})
    		})
    	}
    	
    }
}	
</script>
<style lang="scss" scoped>
	.userInformations{
		h3{
			color:red;
			padding: 15px 10px 0;
		}
		line-height: 20px;
		font-size: 12px;
		ul{
			padding: 5px 20px;
		}
		li{
			border-bottom: 1px solid #ccc;
			line-height: 26px;
		}
		.kernel{
			width: 40%;
		}
	}
</style>