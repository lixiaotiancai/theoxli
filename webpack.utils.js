const path = require('path');
const glob = require('glob');
const fs = require('fs');

const pagesDir = path.resolve(__dirname, './src/pages/');

/**
 * 获取打包入口
 *
 * @return {*}
 */
const entry = {};
const mpEntry = {};
function getEntry() {
  const htmlPath = path.resolve(pagesDir, './{**,**/**}/*.html'); // 支持二级目录
  const htmlPathList = glob.sync(htmlPath);

  htmlPathList.forEach((filePath) => {
    const pageName = filePath.match(/\/pages\/(.+)\.html/)[1];
    const mpPageName = filePath.match(/\/pages\/(.+)\/index.html/)[1].replace(/\//g, '');

    ['js', 'ts', 'jsx', 'tsx']
      .map((extension) => filePath.replace('html', extension))
      .forEach((entryJS) => {
        if (fs.existsSync(entryJS)) {
          entry[pageName] = entryJS;
          mpEntry[mpPageName] = entryJS;
        }
      });
  });

  return entry;
}

(function init() {
  getEntry();
})();

module.exports = {
  entry,
  mpEntry,
};
