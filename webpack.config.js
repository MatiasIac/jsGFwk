const path = require('path');

module.exports = {
  mode: 'production',
  target: "web",
  entry: ['./src/webpack-index.js'],
  output: {
    filename: 'jsgfwk-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "jsGFwk",
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};