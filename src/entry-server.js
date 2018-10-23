import { createApp } from './app';
export default context => {
	return new Promise((resolve, reject) => {
		const { app, router } = createApp();
		router.push(context.url);
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject({code: 404});
			}
			context.state = {a: 'asd'}
			console.log('onReady...');
			resolve(app);
		}, reject);
		router.beforeResolve((to, from , next) => {
			console.log('beforeResolve...');
			next();
		});
	});
};