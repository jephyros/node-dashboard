const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development', // production 설정 파일에서는 'production'    
    entry:'./index.js',
    output: {
        path: __dirname + '/dist',
        filename:'server.js'
    },
    target : 'node',
    
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            use: 'file-loader?name=images/[name].[hash].[ext]'
          }
        ]
      },

    externals :[
        nodeExternals()
    ],
    // plugins: [
    //     new CleanWebpackPlugin('server.js'),
    // ]
}