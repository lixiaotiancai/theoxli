const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MpPlugin = require('mp-webpack-plugin');
const { mpEntry } = require('./webpack.utils');

module.exports = {
  mode: 'production',
  entry: mpEntry,
  output: {
    path: path.resolve(__dirname, './dist/mp/common'),
    filename: '[name].js', // 必需字段，不能修改
    library: 'createApp', // 必需字段，不能修改
    libraryExport: 'default', // 必需字段，不能修改
    libraryTarget: 'window', // 必需字段，不能修改
  },
  target: 'web', // 必需字段，不能修改
  optimization: {
    runtimeChunk: false, // 必需字段，不能修改
    splitChunks: {
      // 代码分隔配置，不建议修改
      chunks: 'all',
      minSize: 1000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.min.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isMiniProgram': true, // 注入环境变量，用于业务代码判断
    }),
    new MiniCssExtractPlugin({
      filename: '[name].wxss',
    }),
    new MpPlugin({
      entry: '/test/aaa',
      router: {
        index: ['/test/aaa'],
      },
      redirect: {
        notFound: 'index',
        accessDenied: 'index',
      },
      generate: {
        autoBuildNpm: 'npm',
      },
      app: {
        navigationBarTitleText: '小程序同构test',
        navigationBarBackgroundColor: '#ff00ff',
        navigationBarTextStyle: 'black',
        backgroundColor: '#ffff00',
        backgroundTextStyle: 'light',
      },
      appExtraConfig: {
        sitemapLocation: 'sitemap.json',
      },
      global: {},
      pages: {},
      optimization: {
        domSubTreeLevel: 10,

        elementMultiplexing: true,
        textMultiplexing: true,
        commentMultiplexing: true,
        domExtendMultiplexing: true,

        styleValueReduce: 5000,
        attrValueReduce: 5000,
      },
      projectConfig: {
        projectname: 'kbone-template-react',
        appid: '',
      },
    }),
  ],
};
