
const webpack = require('webpack')
const path = require('path')
const pathConfig = require('./pathconfig')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    'bmbot': resolve('src/other/plugin/index.js')
  },
  output: {
    // path: resolve('dist/'),
    path: resolve(pathConfig.publicPath),
    // publicPath: pathConfig.publicPath,
    publicPath: pathConfig.prefix,
    // publicPath: '/',
    chunkFilename: 'js/[id].chunk.js',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                quality: 65,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeEmptyAttrs: false,
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.ejs', '.html', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'layout': resolve('src/layout'),
      'assets': resolve('src/assets'),
      'components':resolve('src/components'),
      'util':resolve('src/util'),
      '@': resolve('src'),
      'static': resolve('static')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: pathConfig.stage
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ]
}
