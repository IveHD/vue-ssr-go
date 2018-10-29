import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Bar from './view/Bar.vue';
import Home from './view/Home.vue';

// const Bar = () => import('./view/Bar.vue');
// const Home = () => import('./view/Home.vue');
export function createRouter () {
	return new Router({
		mode: 'history',
		routes: [{
			path: '/view/bar', component: Bar, beforeEnter: (to, from, next) => {console.log('beforeEnter...'); next();}
		}, {
			path: '/', component: Home
		}]
	});
};