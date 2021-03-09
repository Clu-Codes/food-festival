const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// basic webpack config require three properties: entry, output, and mode
// output generally uses a distribution folder
// mode is set to production by default
module.exports = {
    entry: {
       app: './assets/js/script.js',
       events: './assets/js/events.js',
       schedule: './assets/js/schedule.js',
       tickets: './assets/js/tickets.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    // added module for pre-loader using webpack's file-loader - following guidelines set out by https://webpack.js.org/loaders/file-loader/
    module: {
        // added an object to the rules array that will identify the types of files to pre-process using the test property to find a regex. 
        // within the same object as 'test', added another property called 'use' where the file-loader is implemented.
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return '[path][name].[ext]'
                            },
                            publicPath: function(url) {
                                return url.replace('../', '/assets');
                            }
                        }
                    },
                    // second loader is for the optimization of the images that have been emitted by file-loader - file-loader must always go first! 
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
}