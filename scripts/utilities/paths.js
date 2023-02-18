const fs = require('fs');
const path = require('path');
const RootDir = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => {
  return path.resolve(RootDir, relativePath);
};

// 
// ============================================================
// 目录

// 公共的
const PublicDir = resolvePath('public');

// 本地库
const LibsDir = resolvePath('libs');

// 源代码
const SrcDir = resolvePath('src');

// 构建目录
const BuildDir = resolvePath('dist');

// 开源库
const NodeModulesDir = resolvePath('node_modules');

// 模拟数据
const MockDir = resolvePath('mock');

// ============================================================


// ============================================================
// 文件

// package.json
const PackageJson = resolvePath('package.json');

// 首页模板
const IndexHtml = resolvePath('public/index.html');

// 首页入口
const IndexJs = resolvePath('src/index.js');

// 模拟数据
const MockJs = resolvePath('mock/index.js');

// ============================================================

// ============================================================
// 监视忽略
const WatchIgnored = [...['node_modules', 'scripts', 'dist'].map(item => resolvePath(item)), '**/.git'];
// ============================================================

module.exports = {
  // 目录数组
  WatchIgnored,
  // 目录
  RootDir,
  PublicDir,
  LibsDir,
  SrcDir,
  BuildDir,
  NodeModulesDir,
  MockDir,
  // 文件
  PackageJson,
  IndexHtml,
  IndexJs,
  MockJs,
};
