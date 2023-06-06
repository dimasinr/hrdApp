const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Ubah sesuai dengan file utama Anda
  output: {
    path: path.resolve(__dirname, 'build'), // Ubah sesuai dengan direktori output yang diinginkan
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Rule untuk memproses file CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      // Rule untuk memproses file JSX dan JS
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Ubah sesuai dengan nama file CSS output yang diinginkan
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ubah sesuai dengan template HTML Anda
    }),
  ],
  resolve: {
    alias: {
      '@router': path.resolve(__dirname, 'src/router'), // Tambahkan alias untuk '../router'
      '@utils': path.resolve(__dirname, 'src/utils'), // Tambahkan alias untuk '../utils'
      '@components': path.resolve(__dirname, 'src/components'), // Tambahkan alias untuk '../components'
    },
  },
};
