const process = require('process');
const glob = require('glob');
const path = require('path');
const rootPath = process.cwd();

let purifyCssPaths = glob.sync(path.join(rootPath, '/src/server/view/**/*.twig'));
purifyCssPaths = purifyCssPaths.concat(glob.sync(path.join(rootPath, '/src/client/js/**/*.js')));

let setting = {
  entry: rootPath + '/src/client/js/',
  output: rootPath + '/public/dist/',
  mainJs: rootPath + '/src/client/js/app.js',
  lessPath: rootPath + '/src/client/less/pages/',
  publicPath: '/dist/',
  author: 'tianshengjie',
  purifyCssPaths: purifyCssPaths,
  assetJs: false,
  assetName: 'webpack.assets.json',
  alias: {
    libs: path.join(rootPath, '/src/client/js/libs/'),
  },
  libs: rootPath + '/src/client/js/libs/',
  copyLibs: [
    'swiper/dist',
    'jquery/dist',
    'editor.md/',
    'jsonlint/',
  ],
};

module.exports = setting;