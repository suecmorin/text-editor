const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './assets/js/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text editor'
      }),
      new GenerateSW(),
      new WebpackPwaManifest({
        name: 'Text editor',
        short_name: 'Text editor',
        description: 'Keep track of important tasks!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/favicon.ico'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ],
  },
}


