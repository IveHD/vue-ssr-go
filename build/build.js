const webpack = require('webpack');
const serverConfig = require('./webpack.config.server');
const clientConfig = require('./webpack.config.client');

const { rm } = require('shelljs');
rm('-rf', serverConfig.output.path);

webpack(serverConfig, (err, stat) => {
	console.log('server webpack done...');
});

webpack(clientConfig, () => {
	console.log('client webpack done...');
});