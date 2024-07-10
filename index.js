const prettier = require("prettier");
const { sources } = require("webpack");
const { Compilation } = require("webpack");

class PrettierWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap("PrettierWebpackPlugin", (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: "PrettierWebpackPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        async (assets) => {
          const files = Object.keys(assets);
          for (const filename of files) {
            if (filename.endsWith(".html")) {
              const asset = assets[filename];
              let source = asset.source();
              let formattedSource = await prettier.format(
                source,
                Object.assign(this.options, { parser: "html" })
              );
              if (typeof formattedSource !== "string") {
                formattedSource = formattedSource.toString();
              }
              assets[filename] = new sources.RawSource(formattedSource);
            }
          }
        }
      );
    });
  }
}

module.exports = PrettierWebpackPlugin;
