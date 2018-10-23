import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

export function createApp () {
	const router = createRouter();
	router.beforeEach((to, from, next) => {
		console.log('beforeEach...');
		next();
	});
	router.afterEach((to, from) => {
		console.log('afterEach...');
	});
	const app = new Vue({
		router,
		render: h => h(App)
	})
	return { app, router };
};