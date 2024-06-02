const prettier = require("prettier");
const { RawSource } = require("webpack-sources");

class PrettierWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "PrettierWebpackPlugin",
      async (compilation, callback) => {
        const files = Object.keys(compilation.assets);
        for (const filename of files) {
          if (filename.endsWith(".html")) {
            const asset = compilation.assets[filename];
            let source = asset.source();
            let formattedSource = await prettier.format(
              source,
              Object.assign(this.options, { parser: "html" })
            );
            if (typeof formattedSource !== "string") {
              formattedSource = formattedSource.toString();
            }
            compilation.assets[filename] = new RawSource(formattedSource);
          }
        }
        callback();
      }
    );
  }
}

module.exports = PrettierWebpackPlugin;
