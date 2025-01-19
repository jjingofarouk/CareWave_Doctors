const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

const webpackPlugin = new webpack.HotModuleReplacementPlugin();
module.exports = {
  devtool: 'inline-source-map',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },{
        test:/\.(gif|png|jpe?g|svg)$/i,
        use:[
          {
            loader:'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin, webpackPlugin],
  devServer: {
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3006
  }
};
