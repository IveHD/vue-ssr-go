const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	entry: path.resolve(__dirname, '../src/entry-client.js'),
	plugins: [
		new VueSSRClientPlugin()
	]
});