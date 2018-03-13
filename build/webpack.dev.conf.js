const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const { SRCPATH, PUBLICPATH } = require('../config/path.conf.js');

const port = 8080;

module.exports = {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: '@/main.js'
  },
  output: {
    filename: '[name].js',
    publicPath: PUBLICPATH
  },
  resolve: {
    extensions: ['.js', '.vue', '.sass', '.scss', '.json'],
    // 简称
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SRCPATH
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 命令行友好提示
    new FriendlyErrorsPlugin(),

    // 修改页面静态文件路径
    new HtmlWebpackPlugin({
      title: '日历组件',
      template: path.resolve(SRCPATH, './index.html')
    }),

    // 浏览器打开地址
    new OpenBrowserPlugin({
      url: 'http://localhost:' + port
    }),
  ],

  // 代理服务器
  devServer: {
    contentBase: SRCPATH,
    host: '0.0.0.0',
    port: port,
    hot: true,
    noInfo: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    // proxy: proxyTable[argv.proxy]
  }
};
