var webpack = require('webpack')


module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
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
