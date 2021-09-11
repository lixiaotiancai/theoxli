const path = require('path');
const glob = require('glob');
const fs = require('fs');

const pagesDir = path.resolve(__dirname, './src/pages/');

/**
 * 获取打包入口
 *
 * @return {*}
 */
const devEntry = {};
function getEntry() {
  const htmlPath = path.resolve(pagesDir, './{**,**/**}/*.html'); // 支持二级目录
  const htmlPathList = glob.sync(htmlPath);

  htmlPathList.forEach((filePath) => {
    const pageName = filePath.match(/\/pages\/(.+)\.html/)[1];

    ['js', 'ts', 'jsx', 'tsx']
      .map((extension) => filePath.replace('html', extension))
      .forEach((entry) => {
        if (fs.existsSync(entry)) {
          devEntry[pageName] = entry;
        }
      });
  });

  return devEntry;
}

(function init() {
  getEntry();
})();

module.exports = {
  devEntry,
};
