import { resolve } from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader/lib/';

// TO-DO: css, js code-splitting (if needed)

const config: webpack.Configuration = {
  name: 'client bundle',
  entry: resolve(__dirname, './src/index.ts'),

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
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
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
