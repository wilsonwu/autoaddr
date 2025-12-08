# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2025-12-08

### Changed

- **Address Parsing Logic**: Modified the parsing rule to include the house number directly in the `address` field instead of extracting it separately.
- **UI Update**: Removed the separate display row for "House Number" in the result view to reflect the parsing logic change.

## [1.1] - 2025-12-04

### Added

- **Side Panel Support**: The extension now operates in the Chrome Side Panel, allowing users to keep it open while browsing other tabs.
- **Internationalization (i18n)**: Added full support for English (`en`) and Simplified Chinese (`zh_CN`). The interface language automatically adapts to the browser settings or can be manually switched.
- **Smart Province Completion**: Implemented logic to automatically infer the Province/State if it is missing from the address but the City is identified.
- **Click-to-Copy**: Users can now click on any parsed field (Name, Phone, Address, etc.) to instantly copy the content to the clipboard.
- **Privacy Policy**: Added a bilingual (English/Chinese) Privacy Policy.

### Changed

- **UI Overhaul**: Improved the design of the main interface (`hello.html`) and the Options page (`options.html`) for a better user experience.
- **Icon System**: Updated extension icons to standard PNG format.
- **Documentation**: Updated `README.md` and `README_EN.md` with installation, configuration, and packaging instructions.

### Fixed

- Fixed issues with Chinese character encoding.
- Optimized address parsing logic for better accuracy with house numbers.

## [1.0] - 2025-12-03

### Added

- Initial release.
- Basic address parsing using Azure OpenAI.
- Configuration page for API Endpoint and Key.
- Popup interface.
