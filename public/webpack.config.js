import path from "path";
import { fileURLToPath } from "url"; // Importer fileURLToPath pour traiter __dirname

const __filename = fileURLToPath(import.meta.url); // Définir __filename
const __dirname = path.dirname(__filename); // Définir __dirname

export default {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
