const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var entries = getEntry('src/js/page/**/*.js');
var config = {
	entry: entries,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash].js',
	},
	plugins: [
		new CleanWebpackPlugin(['dist']), //清理dist目录
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
				test: /\.(gif|png|jpg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'img/[name].[hash].[ext]',
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

let pages = getEntry('src/view/**/*.html');
for( let key in pages){
	let conf = {
		filename: key + '.html', //生成的html存放路径，相对于path
		template: pages[key], //html模板路径
		inject: true, //js插入的位置，true/'head'/'body'/false
		minify: {
			// 移除空白
			collapseWhitespace: true,
			// 移除注释
			removeComments: true,
			// 移除属性中的双引号
			removeAttributeQuotes: true
		}
	};
	if(key in config.entry) {
		conf.favicon = 'src/img/favicon.ico';
		conf.inject = 'body';
		conf.chunks = ['vendors', key];
	}
	config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;

function getEntry(globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    entries[basename] = './' + entry;
  }
  return entries;
}

