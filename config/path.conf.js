/**
 * 参数配置
 */

const path = require('path');
const ROOTPATH = path.resolve(__dirname, '..');
const NODEMODULESPATH = path.resolve(ROOTPATH, './node_modules');
const SRCPATH = path.resolve(ROOTPATH, './src');
const DISTPATH = path.resolve(ROOTPATH, './dist');
const PUBLICPATH = '/';

module.exports = {
  // 根路径
  ROOTPATH,
  // node_modules
  NODEMODULESPATH,
  // 资源路径
  SRCPATH,
  // 编译路径
  DISTPATH,
  // cdn地址
  PUBLICPATH
};
