const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
	entry: path.resolve(__dirname, '../src/entry-server.js'),
	output: {
		libraryTarget: 'commonjs2'
	},
	target: 'node',
	plugins: [
		new VueSSRServerPlugin()
	]
});