const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// import favicon from './src/assets/logos/favicon.svg';
// favicon;
// let img = new Image();

//  img.src = require('./src/assets/logos/favicon.svg');


// function importAllImages(r) {
//   return r.keys().map(r);
// }

// const images = importAllImages(require.context('./src/assets', false, /\.(png|jpe?g|svg|ico)$/));

// new HtmlWebpackPlugin({
//   favicon: "./src/assets/favicon.ico"
// })

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    port: 8080,
    proxy: {
    },
  },
});
