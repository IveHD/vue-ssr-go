const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	// entry: {
	// 	vendor: ['vue', 'element-ui']
	// },
	mode: 'development',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@component': path.resolve(__dirname, '../src/component')
		}
	},
	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			}, {
				test: /\.(woff|svg|eot|ttf)$/,
				loader: 'url-loader'
			}, {
				test: /\.styl(us)?$/,
				use: ['vue-style-loader', 'css-loader', 'stylus-loader']
			}, {
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		// new webpack.DllPlugin({
		// 	name: '[name]_[hash]',
		// 	path: path.join(__dirname, '../dist', '[name]-manifest.json'),
		// 	context: path.resolve(__dirname, '../') 
		// }),
		// new webpack.DllReferencePlugin({
		// 	context: __dirname,
		// 	manifest: require('../dist/vendor-manifest.json'),
		// }),
		// new BundleAnalyzerPlugin()
	]
};