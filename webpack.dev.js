const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const devEntry = {};
const pagesDir = path.resolve(__dirname, './src/pages/');

/**
 * 获取打包入口
 */
function getEntry() {

  const htmlPath = path.resolve(pagesDir, './{**,**/**}/*.html');
  const htmlPathList = glob.sync(htmlPath);

  htmlPathList.forEach(filePath => {
    const pageName = filePath.match(/\/pages\/(.+)\.html/)[1];

    ['js', 'ts', 'jsx', 'tsx']
      .map(extension => filePath.replace('html', extension))
      .forEach(entry => {
        if (fs.existsSync(entry)) {
          devEntry[pageName] = entry;
        }
      })
  })

  return devEntry;
}

/**
 * 获取htmlwebpack插件列表
 */
function getHtmlWebpackPluginList() {
  return Object.entries(devEntry).map(([chunk, entryJs]) => {
    return new HtmlWebpackPlugin({
      chunks: [chunk],
      template: entryJs.replace(/(jsx|tsx|js|ts)/g, 'html'),
      filename: `${chunk}.html`
    })
  })
}

/**
 * 初始化
 */
function init() {
  getEntry();
}

init();

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
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
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
    ...getHtmlWebpackPluginList(),
    new HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.min.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        }
      }
    }
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8888,
    hot: true,
  }
}