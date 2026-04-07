# pirulug-prettify-webpack-plugin

[![npm version](https://img.shields.io/npm/v/pirulug-prettify-webpack-plugin.svg)](https://www.npmjs.com/package/pirulug-prettify-webpack-plugin)
[![license](https://img.shields.io/npm/l/pirulug-prettify-webpack-plugin.svg)](https://github.com/pirulug/pirulug-prettify-webpack-plugin/blob/main/LICENSE)

A Webpack plugin to automatically prettify your output assets (HTML, CSS, JS, JSON) using **Prettier** during the build process.

## Features

- **Automatic Formatting**: Automatically formats assets during the Webpack optimization stage.
- **Multi-format Support**: Works with `.html`, `.css`, `.js`, `.mjs`, and `.json` by default.
- **Config Resolution**: Automatically respects your project's `.prettierrc` or other Prettier configuration files.
- **Fine-grained Control**: Include or exclude specific files using strings or Regular Expressions.
- **Customizable**: Pass custom Prettier options directly through the plugin.


## Installation

```bash
npm install --save-dev pirulug-prettify-webpack-plugin prettier
```
*Note: `prettier` is a peer dependency and must be installed separately.*

## Usage

Add the plugin to your `webpack.config.js`:

```javascript
const PrettierWebpackPlugin = require('pirulug-prettify-webpack-plugin');

module.exports = {
  // ... other webpack config
  plugins: [
    new PrettierWebpackPlugin({
      // Optional configuration
      extensions: [".html", ".css", ".js"],
      prettierOptions: {
        semi: true,
        singleQuote: true
      }
    })
  ]
};
```

## Testing

To run the test build and verify the plugin's functionality, use:

```bash
npm test
```

This will run a Webpack build using the configuration in `tests/webpack.config.js` and output formatted assets to the `dist` directory.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `extensions` | `string[]` | `[".html", ".css", ".js", ".json"]` | Array of file extensions to process. |
| `include` | `string|RegExp|Array` | `undefined` | Patterns to include. |
| `exclude` | `string|RegExp|Array` | `undefined` | Patterns to exclude from processing. |
| `prettierOptions` | `Object` | `{ bracketSameLine: true, htmlWhitespaceSensitivity: "ignore" }` | Direct options to pass to `prettier.format()`. |
| `resolveConfig` | `boolean` | `true` | Whether to automatically search for and load Prettier config files. |

### Advanced Example

```javascript
new PrettierWebpackPlugin({
  include: /src\/templates/,
  exclude: [/node_modules/, 'legacy-file.js'],
  prettierOptions: {
    tabWidth: 4
  },
  resolveConfig: true
})
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Pirulug**
- GitHub: [@pirulug](https://github.com/pirulug)