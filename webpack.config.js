const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'index.html'),
    path.resolve(__dirname, 'src', 'index.js')
  ],
  module: {
    rules: [
      {
        test: /\.html/, 
        loader: 'file-loader?name=[name].[ext]', 
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
