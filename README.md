# GlyphSwap

[English](README.md) | [Русский](README.ru.md)

## Description
**GlyphSwap** is a browser-based Userscript designed to make web browsing easier by translating text directly inside images. Whether you are reading comics, technical documentation, or social media posts, GlyphSwap identifies text in images and overlays the translation in real-time.

## Key Features
* **Hover-to-Swap:** Simple interface that activates only when you need it.
* **Smart OCR:** Uses Yandex OCR engine to accurately extract text from various image types.
* **Batch Translation:** Translates multiple text blocks simultaneously to ensure context is preserved.
* **Non-destructive:** Overlays translations directly onto the image without altering original content permanently.

## Installation
1. **Userscript Manager:** Ensure you have [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) installed in your browser.
2. **Install Script:** Click on the link below to install the latest version:
   [**Install GlyphSwap**](https://github.com/IsPorCHen/GlyphSwap/releases/download/v1.0.0/glyphswap.user.js)

## How to Use
1. Once installed, navigate to any website containing images with text.
2. **Hover** over an image. You will see an **"A文 Swap"** button appear in the top-right corner of the image.
3. Click the button.
4. The script will fetch the image, perform OCR, translate the text, and render the result over the image.

## Roadmap & Contribution
This project is open-source. Feel free to open an issue or submit a pull request if you want to add support for new OCR engines or features.

## License
Licensed under the [MIT License](LICENSE).
