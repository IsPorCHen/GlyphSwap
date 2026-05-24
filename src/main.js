import { ImageContextMenuInterceptor } from './core/imageContextMenuInterceptor.js';
import { SecureImageFetcher } from './core/secureImageFetcher.js';

function bootstrap() {
    console.log('[GlyphSwap] Initialization started.');

    const imageFetcher = new SecureImageFetcher();

    const handleImageTranslationRequest = async (imageElement) => {
        try {
            console.log('[GlyphSwap] Intercepted image for translation. Bypassing CORS to fetch blob...', imageElement.src);

            const imageBlob = await imageFetcher.fetchAsBlob(imageElement.src);

            console.log(`[GlyphSwap] Successfully extracted Blob. Size: ${imageBlob.size} bytes. Type: ${imageBlob.type}`);
            alert(`Картинка успешно захвачена в обход CORS!\nРазмер: ${imageBlob.size} байт.`);

        } catch (error) {
            console.error('[GlyphSwap] Error processing image:', error);
            alert('Ошибка при захвате картинки: ' + error.message);
        }
    };

    const contextMenuInterceptor = new ImageContextMenuInterceptor(handleImageTranslationRequest);
    contextMenuInterceptor.attachListeners();

    console.log('[GlyphSwap] Successfully injected context menu interceptor.');
}

bootstrap();