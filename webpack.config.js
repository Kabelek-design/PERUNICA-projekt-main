const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

// let htmlPageNames = ['demo-index', 'index-mobile', 'informacja-turystyczna', 'informacja-turystyczna-mobile', 'kolo-roku', 'kolo-roku-mobile', 'kontakt', 'kontakt-mobile', 'odkryjperunice', 'odkryj-perunice-mobile', 'szlak-kulinarny', 'szlak-kulinarny-mobile', 'team-building', 'team-building-mobile'];
let htmlPageNames = ['demo-index',
                    'informacja-turystyczna',
                    'kolo-roku',
                    'kontakt',
                    'odkryjperunice',
                    'szlak-kulinarny',
                    'szlak-czarownic',
                    'team-building',
                    'pdfs'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    //chunks: [`${name}`], // respective JS files
    favicon: './src/images/content/perunica-logo.png',
    inject: true
  })
});


let htmlPageNamesContrast = [];
let multipleHtmlPluginsContrast = htmlPageNamesContrast.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    //chunks: [`${name}`], // respective JS files
    favicon: './src/images/content/perunica-logo.png',
    inject: true
  })
});


module.exports = {
  entry: './src/scripts/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/images/content/perunica-logo.png'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
          { from: 'src/pdfqr', to: "pdfqr" }
      ],
    }),
  ].concat(multipleHtmlPlugins).concat(multipleHtmlPluginsContrast),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'src/images/content/[name].[ext]',
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:6].[ext]',
              publicPath: '../'
            },
          },
        ],
      }
    ]
  }
};