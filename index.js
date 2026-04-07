const prettier = require("prettier");
const { sources, Compilation } = require("webpack");

class PrettierWebpackPlugin {
  /**
   * @param {Object} options
   * @param {string|RegExp|Array<string|RegExp>} [options.include] - Files to include
   * @param {string|RegExp|Array<string|RegExp>} [options.exclude] - Files to exclude
   * @param {string[]} [options.extensions] - File extensions to process (default: .html, .css, .js, .json)
   * @param {Object} [options.prettierOptions] - Custom Prettier options
   * @param {boolean} [options.resolveConfig=true] - Whether to resolve Prettier config from file
   */
  constructor(options = {}) {
    this.options = {
      extensions: [".html", ".css", ".js", ".json"],
      resolveConfig: true,
      prettierOptions: {
        bracketSameLine: true,
        htmlWhitespaceSensitivity: "ignore",
        ...options.prettierOptions,
      },
      ...options,
    };
  }

  /**
   * Check if a filename matches the inclusion/exclusion criteria.
   * @param {string} filename
   * @returns {boolean}
   */
  shouldProcess(filename) {
    const { include, exclude, extensions } = this.options;

    // Check extensions
    const hasValidExtension = extensions.some((ext) => filename.endsWith(ext));
    if (!hasValidExtension) return false;

    // Helper to check match
    const isMatch = (pattern, str) => {
      if (pattern instanceof RegExp) return pattern.test(str);
      if (typeof pattern === "string") return str.includes(pattern);
      return false;
    };

    // Check exclude
    if (exclude) {
      const excludePatterns = Array.isArray(exclude) ? exclude : [exclude];
      if (excludePatterns.some((p) => isMatch(p, filename))) return false;
    }

    // Check include
    if (include) {
      const includePatterns = Array.isArray(include) ? include : [include];
      return includePatterns.some((p) => isMatch(p, filename));
    }

    return true;
  }

  apply(compiler) {
    const pluginName = "PrettierWebpackPlugin";

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        async () => {
          const assets = compilation.getAssets();

          for (const asset of assets) {
            const { name, source } = asset;

            if (this.shouldProcess(name)) {
              try {
                const originalContent = source.source().toString();
                
                // Determine parser based on extension
                let parser;
                if (name.endsWith(".html")) parser = "html";
                else if (name.endsWith(".css")) parser = "css";
                else if (name.endsWith(".js") || name.endsWith(".mjs")) parser = "babel";
                else if (name.endsWith(".json")) parser = "json";

                // Resolve config if enabled
                let config = {};
                if (this.options.resolveConfig) {
                  config = (await prettier.resolveConfig(name)) || {};
                }

                const formattedContent = await prettier.format(originalContent, {
                  ...config,
                  ...this.options.prettierOptions,
                  parser: parser || this.options.prettierOptions.parser,
                });

                if (formattedContent !== originalContent) {
                  compilation.updateAsset(name, new sources.RawSource(formattedContent));
                }
              } catch (error) {
                compilation.errors.push(
                  new Error(`[${pluginName}] Error formatting ${name}: ${error.message}`)
                );
              }
            }
          }
        }
      );
    });
  }
}

module.exports = PrettierWebpackPlugin;
