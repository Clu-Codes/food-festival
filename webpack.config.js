const path = require('path');
const webpack = require('webpack');

// basic webpack config require three properties: entry, output, and mode
// output generally uses a distribution folder
// mode is set to production by default
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    mode: 'development'
}