const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pages = [
  'index',
  'informacja-turystyczna',
  'kolo-roku',
  'kontakt',
  'odkryjperunice',
  'szlak-kulinarny',
  'szlak-czarownic',
  'team-building',
  'pdfs',
  'demo-index'
];

module.exports = (_env, { mode } = {}) => {
  const production = mode === 'production';

  return {
    entry: './src/scripts/index.js',
    output: { filename: production ? '[name].[contenthash:8].js' : '[name].js' },
    optimization: { minimizer: [new TerserPlugin()] },
    plugins: [
      ...pages.map(name => new HtmlWebpackPlugin({
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        favicon: './src/images/content/perunica-logo.png',
        scriptLoading: 'defer',
        ...(name === 'pdfs' && { chunks: [] })
      })),
      new MiniCssExtractPlugin({ filename: production ? '[name].[contenthash:8].css' : '[name].css' }),
      ...(production ? [new CleanWebpackPlugin()] : []),
      new CopyPlugin({
        patterns: [
          { from: 'src/pdfqr', to: 'pdfqr' },
          { from: 'src/seo', to: '.', globOptions: { dot: true } }
        ]
      }),
      ...(production ? [new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: { preset: ['default', { normalizeUrl: false }] }
      })] : [])
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            attributes: {
              list: ['...', {
                tag: 'link',
                attribute: 'href',
                type: 'src',
                filter: (_tag, _attribute, { rel, as }) =>
                  rel === 'stylesheet' || (rel === 'preload' && ['image', 'font'].includes(as))
              }]
            }
          }
        },
        {
          test: /\.(png|jpe?g|webp|svg|gif|ico)$/i,
          loader: 'file-loader',
          options: { name: 'img/[contenthash].[ext]' }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            { loader: 'sass-loader', options: { implementation: require('sass') } }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: { name: 'fonts/[name].[contenthash:8].[ext]' }
        }
      ]
    }
  };
};
