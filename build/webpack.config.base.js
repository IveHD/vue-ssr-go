const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/'
	},
	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.styl(us)?$/,
				use: ['vue-style-loader', 'css-loader', 'stylus-loader']
			},
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
};