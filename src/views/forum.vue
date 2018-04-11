<template>
	<transition name="fade">
	<div id="app">
		 <transition name="fade">
		<ul class="mt20 forum_nav" v-show='step==1'>
			<li class="clearfix text_center">
				<div class="fl w40 text_over">title</div>
				<div class="fl w20">comment/readed</div>
				<div class="fl w10">author</div>
				<div class="fl w20">date</div>
			</li>



			<li class="clearfix text_center border_bottom" v-for='item in dataList'>
				<div class="fl w40 text_over "><span class="li_hover" @click='toDetails(item)'>{{item.title}}</span></div>
				<div class="fl w20 "><span class="li_hover">{{item.readed}}</span></div>
				<div class="fl w10 "><span class="li_hover">{{item.author}}</span></div>
				<div class="fl w20">{{item.date}}</div>
			</li>
		</ul>
		 </transition>
		 <transition name="fade">
		<div class="forum_content" v-show='step==2'>
			<div class="clearfix">
				<div class="cont_tit fr" @click="$store.commit('forumShowStepControl',1)">return</div>
			</div>

			<div class="clearfix">
				<div class="cont_left fl w10">{{choseInfo.author}}</div>
				<div class="cont_right fl w80">
					{{choseInfo.content}}
				</div>
			</div>
		</div>
		 </transition>
	</div>
</transition>
</template>

<script>
	export default {
		name: 'forum',
		data() {
			return {
				dataList: [],
				choseInfo: {},
			}
		},
		computed: {
			step(){
				return this.$store.state.forumShowStep;
			}
		},
		created() {
			this.getList();
		},
		methods: {
			toDetails(item) {
				this.choseInfo = item || {}
				this.$store.commit('forumShowStepControl',2)
			},
			getList() {
				this.$store.commit('loadingShow');
				this.$http.get('http://localhost:3000/getList').then(response => {
					this.$store.commit('loadingHide');
					console.log(response.body);
					this.dataList = response.body || [];
				}, response => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#app {
		padding: 0 20px;
	}
	
	.forum_nav {
		li {
			line-height: 40px;
			border-bottom: 1px solid #ccc;
		}
	}
	
	.li_hover:hover {
		color: blueviolet;
		cursor: pointer;
	}
	
	.forum_content {
		.cont_right {
			color: #8B0000;
			font-size: 18px;
			line-height: 30px;
			text-indent: 2em;
		}
	}
	
	.cont_tit {
		font-size: 20px;
		color: chocolate;
		cursor: pointer;
		padding: 5px 10px;
		border-radius: 4px;
		border: 1px solid #ccc;
		display: inline-block;
		margin: 10px 50px 0;
	}
</style>