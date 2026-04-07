# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-07

### Added
- Support for multiple file formats by default: `.html`, `.css`, `.js`, `.mjs`, and `.json`.
- Automatic Prettier configuration resolution from the project.
- Support for `include` and `exclude` patterns (strings or Regular Expressions).
- Customizable `prettierOptions` through the plugin constructor.
- Comprehensive documentation and professional project structure.
- Webpack 5 compliant asset processing using `compilation.updateAsset`.

### Changed
- Updated `index.js` to use `tapPromise` and `Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE`.
- Improved internal logic for asset iteration and modification.

### Fixed
- Improved error handling and reporting during asset processing.

## [0.0.5] - 2024-05-15

### Added
- Initial release.
- Basic support for `.html` file prettification.
- Simple Prettier configuration support.
