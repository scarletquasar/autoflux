const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    mode: "production",
    optimization: {
      minimize: false
    },
    target: 'node'
}