const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
 "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/html/wrapper.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.join(__dirname, './src/html/wrapper.html')
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/html/partials/header.html'),
        template_filename: '*'
      },
      {
        path: path.join(__dirname, './src/html/pages/home.html')
      },
      {
        path: path.join(__dirname, './src/html/pages/about.html'),
        template_filename: 'about.html'
      },
      {
        path: path.join(__dirname, './src/html/partials/footer.html'),
        template_filename: '*'
      },
    ])
  ]
}
