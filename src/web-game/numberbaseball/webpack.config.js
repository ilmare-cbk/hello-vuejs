const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: {
        app: './main.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',  // app.js
        path: __dirname + '/dist'
    }
}