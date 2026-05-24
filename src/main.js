import { ImageContextMenuInterceptor } from './core/imageContextMenuInterceptor.js';

function bootstrap() {
    console.log('[GlyphSwap] Initialization started.');

    // The callback isolates the UI interactor from the actual translation logic
    const handleImageTranslationRequest = (imageElement) => {
        console.log('[GlyphSwap] Image intercepted for translation:', imageElement.src);
    };

    const contextMenuInterceptor = new ImageContextMenuInterceptor(handleImageTranslationRequest);
    contextMenuInterceptor.attachListeners();

    console.log('[GlyphSwap] Successfully injected context menu interceptor.');
}

bootstrap();