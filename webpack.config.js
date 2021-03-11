const WebpackPwaManifest = require('webpack-pwa-manifest');
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
                            esModule: false,
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
        }),
        new WebpackPwaManifest({
            name: 'Food Event',
            short_name: 'Foodies',
            description: 'An app that allows you to view upcoming food events.',
            start_url: '../index.html',
            background_color: '#01579b',
            theme_color: '#ffffff',
            // fingerprints are unique to the manifest plugin - they determine whether the webpack should generate unique fingerprints for each new manifest. 
            fingerprints: false, 
            // inject, also unqiue to manifest plugin, determines whether the link to the manifest.json is added to the HTML. Since we aren't using fingerprints, there's no need to use inject. 
            inject: false,
            publicPath: './',
            icons: [{
                src: path.resolve('assets/img/icons/icon-512x512.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons')
            }]
        })
    ],
    mode: 'development'
}