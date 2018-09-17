const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin('style.css'), //分离css
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', {
					discardComments: {
						removeAll: true
					}
				}],
			},
			canPrint: true
		}),
	],
});