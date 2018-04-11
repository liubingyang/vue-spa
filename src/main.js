import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import vueLoading from 'vue-loading-template'

import store from "./store"
import router from "./router"


Vue.use(VueResource)

new Vue({
	el: '#app',
	store,
	router,
	render: j => j(App)
})

window.log=console.log;

window.searchFunction = function(val) {
	window.searchInfo = val
};
window.creatScript=function(url) {
	return new Promise((resolve, reject) => {
		let script = document.createElement('script');
		script.id = 'removeScript';
		script.src = url;
		document.body.appendChild(script);
		script.onload = function() {
			resolve(window.searchInfo);
			document.body.removeChild(document.getElementById('removeScript'));

		}
	});
	
};
window.toNewPage=function(url){
	let a=document.createElement('a');
	a.href=url;
	a.target='_blank';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}