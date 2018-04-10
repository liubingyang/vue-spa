import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Forum from '../views/forum'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: Home
	}, {
		path: '/forum',
		name: 'forum',
		component: Forum
	}]
})