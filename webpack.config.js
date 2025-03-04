const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  mode: 'production', // 或 'development'
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 生成的 JS 文件
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 处理 CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // 处理图片
        type: 'asset/inline', // 直接内联图片
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 使用的 HTML 模板
      inject: 'body',
      minify: true, // 压缩 HTML
    }),
    new HtmlInlineScriptPlugin(), // 内联所有 JS
  ],
};
