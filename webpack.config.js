var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  mode: "production",
  context: __dirname + '\\src', // `__dirname` is root of project and `/src` is source
  entry: {
    app: './js/index.js'
  },
  output: {
    path: __dirname + '/dist', // `/dist` is the destination
    filename: 'bundle.js' // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/, // rule for .js files
        exclude: /node_modules/,
        loader: "babel-loader" // apply this loader for js files
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // the order is important. it executes in reverse order !
          'css-loader' // this will load first !
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })]
};

module.exports = config
