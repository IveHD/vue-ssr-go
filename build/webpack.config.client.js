const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const config = merge(baseConfig, {
	entry: {
		client_main: [path.resolve(__dirname, '../src/entry-client.js')]
	},
	plugins: [
		new VueSSRClientPlugin()
	]
});
console.log(config);
module.exports = config;