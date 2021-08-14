const path = require('path');
const glob = require('glob');

const pagesDir = path.resolve(__dirname, './src/pages/');

/**
 * 获取打包入口
 */
function getEntry() {
  const devEntry = {};
  const htmlPath = path.resolve(pagesDir, './**/*.js');
  const htmlPathList = glob.sync(htmlPath);

  htmlPathList.forEach(filePath => {
    const htmlName = filePath.match(/\/pages\/(.+)\.js/)[1];
    devEntry[htmlName] = filePath;
  })

  return devEntry;
}

module.exports = {
  mode: 'development',
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].min.js',
  },
  devServer: {
    publicPath: './dist',
    port: 8888,
    hot: true,
  },
}