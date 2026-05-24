import { ImageHoverWidget } from './core/imageHoverWidget.js';
import { SecureImageFetcher } from './core/secureImageFetcher.js';
import { ImageCompressor } from './core/imageCompressor.js';
import { YandexOcrClient } from './core/yandexOcrClient.js';
import { ImageOverlayRenderer } from './core/imageOverlayRenderer.js';

function bootstrap() {
    console.log('[GlyphSwap] Initialization started.');

    const imageFetcher = new SecureImageFetcher();
    const imageCompressor = new ImageCompressor();
    const ocrClient = new YandexOcrClient();

    const handleImageTranslationRequest = async (imageElement) => {
        try {
            console.log('[GlyphSwap] Intercepted image. Fetching blob...', imageElement.src);

            let imageBlob = await imageFetcher.fetchAsBlob(imageElement.src);
            imageBlob = await imageCompressor.compressIfNeeded(imageBlob);

            console.log(`[GlyphSwap] Sending blob (${imageBlob.size} bytes) to Yandex OCR...`);

            const ocrResult = await ocrClient.extractTextBlocks(imageBlob);

            console.log('[GlyphSwap] OCR successful! Extracted blocks:', ocrResult);

            const renderer = new ImageOverlayRenderer();
            renderer.render(imageElement, ocrResult.data.blocks);

        } catch (error) {
            console.error('[GlyphSwap] Error processing image:', error);
            alert('Ошибка при обработке картинки: ' + error.message);
        }
    };

    const hoverWidget = new ImageHoverWidget(handleImageTranslationRequest);
    hoverWidget.attachListeners();

    console.log('[GlyphSwap] Successfully injected hover widget UI.');
}

bootstrap();