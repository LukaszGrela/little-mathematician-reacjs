const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OUTPUT_FOLDER = 'public';

module.exports = (env, argv) => {
  const isProd = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles/styles.css');

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, OUTPUT_FOLDER),
      filename: './js/bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: isProd ? [
      CSSExtract,
      // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourceMap: false }),
    ] : [
        CSSExtract
      ],
    devtool: isProd ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, OUTPUT_FOLDER),
      historyApiFallback: true
    }
  }
};
/* 
when using new UglifyJsPlugin and --opimize-minimize (or -p) you are adding the UglifyJsPlugin twice. 
Omit the CLI option.
*/