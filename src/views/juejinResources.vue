<template>
	<div class="juejinResources w60">
			<ul>
				<li class="" v-for='(item,i) in juejinResources'>
					<div class="clearfix littleTop">
						<div class="fl red" v-show='!item.original'>热·</div>
						<div class="fl pink" v-show='i<10'>专栏·</div>
						<div class="fl inherit">{{item.user.jobTitle}}·</div>
						<div class="fl inherit" @click='getJuejinResourcesUserInfo(item.user)'>{{item.user.username}}·</div>
						<div class="fl inherit">{{item.createdAt|lastTime}}</div>
					</div>
					<div><a :href="item.originalUrl" class="title" target="_blank">{{item.title}}</a></div>
				</li>
			</ul>
			</div>
</template>
<script>
	export default {
		data(){
			return {
				juejinResources:[],
			}
		},
		created(){
			this.getJuejinResources();
		},
		filters:{
			lastTime(v){
				if(v){
					let val=new Date()-new Date(v)
					let days = parseInt(val / (1000 * 60 * 60 * 24));
	       	 		let hours = parseInt((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	       	 		let minutes = parseInt((val % (1000 * 60 * 60)) / (1000 * 60));
	        		let seconds = ((val % (1000 * 60)) / 1000).toFixed(1);
	       	 		return days>0?days+'天':hours>0?hours+'小时':minutes>0?minutes+'分钟':seconds+'秒'
				}else{
					return ''
				}				
			}
		},
		methods:{
			getJuejinResources(){
				this.$http.get('http://localhost:3000/juejinResources').then(data=>{
					log(data)
					this.juejinResources=data.body.d.entrylist;
				})
			},
			getJuejinResourcesUserInfo(item){
					window.toNewPage('https://juejin.im/user/'+item.objectId)
			},
		}
	}
</script>

<style lang="scss" scoped>
.juejinResources{
			margin:0 auto;
			.littleTop{
				font-size: 12px;
				line-height: 16px;
				div:hover{
					cursor: pointer;
					color:#aaa;
				}
			}
			ul{
				padding: 5px 30px;
			}
			li{
				padding: 5px 0;
			
			}
			.title{
					line-height: 30px;
					color: #2e3135;
					font-weight: bold;
				}
		a:hover {
		 text-decoration:  underline; 
		}
	}
		
</style>