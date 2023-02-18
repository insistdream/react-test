
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./configs/webpack.config.prod.js');
const paths = require('./utilities/paths.js');

// ============================================================
// 清空构建目录
fs.emptyDirSync(paths.BuildDir);

// 复制 public 目录中除 index.html 文件外的其他内容到构建目录
fs.copySync(paths.PublicDir, paths.BuildDir, {
  dereference: true,
  filter     : file => file !== paths.IndexHtml,
});
// ============================================================

// ============================================================
// 创建编译对象
const compiler = webpack(config);

// 运行编译对象
compiler.run((err, stats) => {
  // Stats Object
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  // Log result...
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );
});
// ============================================================
