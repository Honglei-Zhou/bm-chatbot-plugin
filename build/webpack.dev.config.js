const webpack = require('webpack')
const path = require('path')
const glob=require('glob')
// process.env.NODE_ENV='development'
const webpackBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

const pathConfig = require('./pathconfig')

const files = glob.sync(resolve('src/views/**/index.js'))
let rewrites=files.map(item=>{
    let name=/.*\/views\/(.*)\/index\.js/.exec(item)[1]
    return{
        from:`/${name}`,
        to:`/views/${name}/index.html`
    }
})

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: pathConfig.stage
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ],
    module:{
        rules:[
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader','css-loader', 'postcss-loader', 'less-loader']
            },
            // Added here by HZ.
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 9900,
        open: false,
        compress: true,
        contentBase: [resolve('dist')],
        index: '/views/bmchat/index.html',
        historyApiFallback: {
            rewrites:rewrites
        },
        inline: true,
        hot: true,
        // publicPath: pathConfig.prefix,
        publicPath:'/'
    }
})
