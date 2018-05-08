const path = require('path');
//const webpack = require('webpack');
module.exports = {
  entry: {
    app:'./src/index.js',
    vendor:['phaser']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
               vendor: { // 将第三方模块提取出来
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                priority: 10, // 优先
                enforce: true
            }
        }
    }
},
  resolve: {
    extensions: ['.js'],
    alias: {
      pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
      phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-arcade-physics.js'),
    //  p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
     // dragonBones: path.join(__dirname, 'lib/dragonBones.js'),
    }
  },
  module: {
    rules: [
      { test: /phaser-arcade-physics\.js$/, loader: 'expose-loader?Phaser' },
      { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
    //  { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
    //  { test: /p2\.js$/, loader: 'expose-loader?p2' },
    //  { test: /dragonBones\.js$/, loader: 'expose-loader?dragonBones' },
    ]
  }
};