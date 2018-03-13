const webpack = require('webpack');
const path = require('path');
const { srcPath } = require('../config/path.conf.js');

module.exports = {
  entry: {
    app: path.resolve('./main.js', srcPath)
  }
};
