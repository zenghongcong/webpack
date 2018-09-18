const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: false,
		hot: true,
		inline: true,
		port: 9999,
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
		        test: /\.css$/,
				use: ['style-loader', 'css-loader']
		    },
		],
	},
});