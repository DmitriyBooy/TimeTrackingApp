const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  entry: './src/server.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new NodemonPlugin({
        script: './dist/server.js',
        watch: path.resolve('./dist'),
        delay: '500',
        verbose: true
      })
    ],
  },
  target: 'node',
  watch: true,
  mode: 'development'
};
