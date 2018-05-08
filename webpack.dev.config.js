const path = require('path');
const cfg = require('./webpack.config');
cfg.mode='development';
cfg.devServer= {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  inline: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    ignored: /node_modules/
  }
};
cfg.devtool='source-map';
module.exports = cfg;