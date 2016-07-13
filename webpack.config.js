var webpack = require('webpack')


module.exports = {
    entry: "./src/index.js",
    output: {
      path: './public',
      publicPath: '/',
      filename: "bundle.js"
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel'
      }]
    },
    devServer: {
      contentBase: './public',
    }
};
