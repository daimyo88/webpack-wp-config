const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const minify = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const outputPath = 'dist';
const localDomain = 'http://theme.local';

module.exports = {
	entry: {
		js: './assets/js/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'scripts.js'
	},
	module: {
		rules: [{
			test:/\.(s*)css$/,
			use: [
				miniCss.loader,
				'css-loader',
				'sass-loader',
			]
		}]
	},
	optimization: {
		minimizer: [
			new minify({}),
			new TerserPlugin(),
		],
	},
	plugins: [
		new miniCss({
			filename: '../dist/styles.css',
		}),
		new BrowserSyncPlugin({
			proxy: localDomain,
			files: [ outputPath + '/*.css' ],
			injectCss: true,
		  }, { reload: false, }),
	]
};