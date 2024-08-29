'use strict'
const path = require('path')
const webpack = require('webpack')
// process.env.NODE_ENV='production'
const webpackBaseConfig = require('./webpack.base.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractTextViews = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    allChunks: true
})

const pathConfig = require('./pathconfig')

const extractTextCommon = new ExtractTextPlugin('css/common.[contenthash].css')
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}
module.exports = merge(webpackBaseConfig, {
    output: {
        // publicPath: '/',
        publicPath: pathConfig.prefix,
        // publicPath: `/${pathConfig.prefix}/`,
        chunkFilename: 'js/[id].chunk.js',
        filename: 'js/[name].min.js'
        // chunkFilename: 'js/[id].[chunkhash].chunk.js',
        // filename: 'js/[name].[chunkhash].min.js'
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                include: [resolve('src/views')],
                exclude: /node_modules/,
                use: extractTextViews.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                include: [resolve('src/assets/css')],
                exclude: /node_modules/,
                use: extractTextCommon.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
				loader: 'babel-loader',
				exclude: function(modulePath) {
					return /node_modules/.test(modulePath) &&
						!/node_modules\/vue-particles/.test(modulePath);
				},
				options: Object.assign({}, this.babelOptions)
            },
            {
                test: /\.css$/,
                use: [ { loader: "style-loader" }, { loader: "css-loader", }, ] 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: pathConfig.stage
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                  warnings: false
                }
              }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_debugger: true,
        //         drop_console: true
        //     }
        // }),
        extractTextCommon,
        extractTextViews
    ]
})
