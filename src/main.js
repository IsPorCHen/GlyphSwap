import { ImageHoverWidget } from './core/imageHoverWidget.js';
import { SecureImageFetcher } from './core/secureImageFetcher.js';
import { YandexOcrTranslationClient } from './core/yandexOcrTranslationClient.js';
import { ImageCompressor } from './core/imageCompressor.js';

function bootstrap() {
    console.log('[GlyphSwap] Initialization started.');

    const imageFetcher = new SecureImageFetcher();
    const imageCompressor = new ImageCompressor(); // Defaults to 1MB limit
    const translationClient = new YandexOcrTranslationClient('ru');

    const handleImageTranslationRequest = async (imageElement) => {
        try {
            console.log('[GlyphSwap] Intercepted image. Fetching blob...', imageElement.src);

            let imageBlob = await imageFetcher.fetchAsBlob(imageElement.src);
            console.log(`[GlyphSwap] Blob extracted. Original size: ${imageBlob.size} bytes.`);

            // Step 1.5: Compress image if it's too large for Yandex API
            imageBlob = await imageCompressor.compressIfNeeded(imageBlob);
            console.log(`[GlyphSwap] Final blob size to send: ${imageBlob.size} bytes.`);

            const translationResult = await translationClient.translateImage(imageBlob);

            console.log('[GlyphSwap] Translation successful! Yandex response:', translationResult);
            alert('Перевод успешен! Открой консоль (F12), чтобы посмотреть структуру ответа.');

        } catch (error) {
            console.error('[GlyphSwap] Error processing image:', error);
            alert('Ошибка при переводе картинки: ' + error.message);
        }
    };

    const hoverWidget = new ImageHoverWidget(handleImageTranslationRequest);
    hoverWidget.attachListeners();

    console.log('[GlyphSwap] Successfully injected hover widget UI.');
}

bootstrap();