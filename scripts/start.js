
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// 开发配置
const config = require('./configs/webpack.config.dev.js');
const serverConfig = require('./configs/webpack.dev.server.js');

// ============================================================
// 创建编译对象
const compiler = webpack(config);

// 创建开发服务器
const devServer = new WebpackDevServer(serverConfig, compiler);

const runServer = async() => {
  console.log('Starting server...');
  await devServer.start();
};

runServer();
// ============================================================
