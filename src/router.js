import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Bar = () => import('./view/Bar.vue');
const Home = () => import('./view/Home.vue');
export function createRouter () {
	return new Router({
		mode: 'history',
		routes: [{
			path: '/bar', component: Bar, beforeEnter: (to, from, next) => {console.log('beforeEnter...'); next();}
		}, {
			path: '/', component: Home
		}]
	});
};