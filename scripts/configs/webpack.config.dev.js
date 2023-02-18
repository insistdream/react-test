const paths = require('../utilities/paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('../utilities/InterpolateHtmlPlugin');

module.exports = {
  mode   : 'development',
  // devtool: 'source-map',
  devtool: 'cheap-module-source-map',
  output : {
    filename     : '[name].chunk.[fullhash].js',
    chunkFilename: '[name].chunk.[fullhash].js',
    path         : paths.BuildDir,
    publicPath   : `http://localhost:${process.env.PORT}/`,
  },
  resolve: {
    alias: {
      '@': paths.SrcDir,
    },
  },
  watchOptions: {
    ignored: paths.WatchIgnored,
  },
  plugins: [
    // 替换新 html 文件中的变量
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL  : '/',
      VERSION_TIME: Date.now(),
    }),
    // 基于 html 模板生成新的 html 文件
    new HtmlWebpackPlugin({
      template: paths.IndexHtml,
      inject  : 'body',
    }),
  ],
  module: {
    rules: [
      {
        test   : /\.(js|jsx|mjs)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use : ['style-loader', 'css-loader'],
      },
      // no css modules
      {
        test: (content) => {
          // 是 less 文件
          if ((/\.less$/).test(content)) {
            // 并且不是以 .m.less 结尾的文件
            if (!(/\.m\.less$/).test(content)) {
              return true;
            }
          }
          return false;
        },
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader : 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader : 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'ant-prefix': 'ant',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // css modules - .m.less 结尾的文件
      {
        test   : /\.m\.less$/,
        include: paths.SrcDir,
        use    : [
          {
            loader: 'style-loader',
          },
          {
            loader : 'css-loader',
            options: {
              importLoaders: 2,
              modules      : {
                localIdentName: '[local]-[hash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader : 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'ant-prefix': 'ant',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
