import { ImageHoverWidget } from './core/imageHoverWidget.js';
import { SecureImageFetcher } from './core/secureImageFetcher.js';

function bootstrap() {
    console.log('[GlyphSwap] Initialization started.');

    const imageFetcher = new SecureImageFetcher();

    const handleImageTranslationRequest = async (imageElement) => {
        try {
            console.log('[GlyphSwap] Intercepted image. Bypassing CORS to fetch blob...', imageElement.src);

            const imageBlob = await imageFetcher.fetchAsBlob(imageElement.src);

            console.log(`[GlyphSwap] Successfully extracted Blob. Size: ${imageBlob.size} bytes.`);
            alert(`Картинка захвачена по кнопке!\nРазмер: ${imageBlob.size} байт.`);

        } catch (error) {
            console.error('[GlyphSwap] Error processing image:', error);
            alert('Ошибка при захвате картинки: ' + error.message);
        }
    };

    const hoverWidget = new ImageHoverWidget(handleImageTranslationRequest);
    hoverWidget.attachListeners();

    console.log('[GlyphSwap] Successfully injected hover widget UI.');
}

bootstrap();