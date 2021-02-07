'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happyPack')
const webpack = require('webpack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  devtool: isProd
  ? false
  : '#cheap-module-source-map',  
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? 
      config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'base': resolve('src/base'),
      'api': resolve('src/api')
    }
  },
  plugins: [
    new HappyPack({
      // id标识 需要处理的loader
      id: 'babel',
      // loader配置和原始配置一样
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery":"jquery"
    })      
  ],  
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/i,
        use: [{
          // loader: 'babel-loader',
          loader: 'happypack/loader?id=babel', // 原始loader替换成`happypack/loader`webpack执行预处理文件时单线程的，我们可以使用happypack来多线程处理文件
          // options: {
          //   presets: ['es2015']
          // }
        }],
        include: [
          resolve('src'),
          resolve('test'),
          resolve('/node_modules/element-ui/packages'),
          resolve('/node_modules/element-ui/src'),
          resolve('/node_modules/asn1.js/lib'),
          resolve('/node_modules/node-rsa')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
         ? ExtractTextPlugin.extract({
           use: [
            {
             loader: 'css-loader',
             options: { minimize: true }
            },
            'stylus-loader'
           ],
           fallback: 'vue-style-loader'
          })
         : ['vue-style-loader', 'css-loader', 'stylus-loader']
       },      
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: [resolve('src/icons')],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  }, 
}
