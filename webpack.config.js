const path = require("path");

module.exports = (env) => {

  return {
    mode: env.NODE_ENV ?? "development",
    // watch : true,
    entry: ["./src/app.js", 'babel-polyfill'], // Point d'entrée
    // Sortie
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    devtool: 'source-map',
    // Configuration de webpack-dev-server minimale
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
