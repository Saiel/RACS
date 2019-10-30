import { resolve } from 'path';
import webpack from 'webpack';

// TO-DO: css, js code-splitting (if needed)

const config: webpack.Configuration = {
  name: 'client bundle',
  entry: resolve(__dirname, './src/index.tsx'),

  target: 'web',

  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ['css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [resolve('src'), resolve('node_modules')],
  },

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000 // enable polling since fsevents are not supported in docker
    }
  },
};

export default config;
