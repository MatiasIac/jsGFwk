const path = require('path');

module.exports = {
  target: "web",
  entry: ['./src/webpack-index.js'],
  output: {
    filename: 'jsgfwk-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //libraryTarget: 'var',
    library: "jsGFwk",
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};