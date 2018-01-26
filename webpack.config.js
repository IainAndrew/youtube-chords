const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react'],
        plugins: ['transform-class-properties']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer
        ]
      }
    }),
  ]
}