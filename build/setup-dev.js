const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const merge = require('webpack-merge');
const clientConfig = require('./webpack.config.client');
const serverConfig = require('./webpack.config.server');

clientConfig.mode = 'development';

module.exports = function setupDev (app, templatePath, cb) {
	let bundle;
	let template = fs.readFileSync(templatePath, 'utf-8');
	let clientManifest;

	let ready;
	const readyPromise = new Promise(r => { ready = r; });
	const update = () => {
		if(bundle && clientManifest) {
			ready();
			cb(bundle, {
				template,
				clientManifest
			});
		}
	};

	if(typeof clientConfig.entry === 'string') {
		clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry];
	}else {
		Object.keys(clientConfig.entry).forEach(function(p){
			if(clientConfig.entry[p] instanceof Array) {
				clientConfig.entry[p].push('webpack-hot-middleware/client');
			}else {
				clientConfig.entry[p] = ['webpack-hot-middleware/client', clientConfig.entry[p]];
			}
		});
	}
	const devClientConfig = merge(clientConfig, {
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]
	});
	const clientCompiler = webpack(devClientConfig);
	const devMiddleware = webpackDevMiddleware(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true,
		stats: {
			colors: true,
			chunks: false,
			modules: false,
			children: false
		}
	});
	const hotMiddleware = webpackHotMiddleware(clientCompiler, {
		heartbeat: 5000
	});
	app.use(devMiddleware);
	app.use(hotMiddleware);
	clientCompiler.plugin('done', stats => {
		console.log('done...');
		try	{
			clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json')));
		}catch(e) {
			console.error(e)
		}
		update();
	});


	const serverCompiler = webpack(serverConfig);
	const mfs = new MFS();
	serverCompiler.outputFileSystem = mfs;
	serverCompiler.watch({}, (err, stats) => {
		if(err) throw err;
		stats = stats.toJson();
		if(stats.errors.length) return;
		try	{
			bundle = JSON.parse(mfs.readFileSync(path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')))
		}catch(e) {
			console.error(e)
		}
		update();
	});

	return readyPromise;
};