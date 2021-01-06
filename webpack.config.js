const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
	entry: ['@babel/polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),   
		filename: 'main.js'       
	},
	devServer: {contentBase: './dist'},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    })   
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: 'css-loader' },        
          { loader: 'postcss-loader', 
            options: { 
              postcssOptions: {
                plugins: [
                  ['autoprefixer', cssnano]
                ]
              }
            }
          }       
        ]
      }
    ]
  }   
};
