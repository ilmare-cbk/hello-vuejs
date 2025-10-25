const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    entry: {
        app: './main.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        port: 8080,
        hot: true,
        open: true,
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',  // app.js
        path: __dirname + '/dist',
        clean: true,
        publicPath: '/dist'
    }
}