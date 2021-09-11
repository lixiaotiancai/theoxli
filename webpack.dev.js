const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { devEntry } = require('./webpack.utils');

/**
 * 获取htmlwebpack插件列表
 */
function getHtmlWebpackPluginList() {
  return Object.entries(devEntry).map(([chunk, entryJs]) => {
    return new HtmlWebpackPlugin({
      chunks: [chunk],
      template: entryJs.replace(/(jsx|tsx|js|ts)/g, 'html'),
      filename: `${chunk}.html`,
    });
  });
}

module.exports = {
  mode: 'development',
  entry: devEntry,
  output: {
    path: path.resolve(__dirname, 'dist/pages'), // 出口目录，dist文件
    filename: '[name].js',
    chunkFilename: '[name].min.js',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
    ...getHtmlWebpackPluginList(),
    new webpack.DefinePlugin({
      'process.env.isMiniProgram': false, // 注入环境变量，用于业务代码判断
    }),
    new HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.min.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        },
      },
    },
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8888,
    hot: true,
  },
};
