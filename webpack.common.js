const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(['dist']), //清理dist目录
		new HtmlWebpackPlugin({ //动态输出入口页
			title: 'Output Management',
			minify: {
				// 移除空白
				collapseWhitespace: true,
				// 移除注释
				removeComments: true,
				// 移除属性中的双引号
				removeAttributeQuotes: true
			}
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
		        test: /\.css$/,
				use: ['style-loader', 'css-loader']
		    },
		    {
				test: /\.(gif|png|jpg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src']
					}
				}
			},
		]
	},
}