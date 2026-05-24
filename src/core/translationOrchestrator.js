export class TranslationOrchestrator {
    /**
     * @param {GoogleTranslateClient} translateClient
     * @param {ImageOverlayRenderer} renderer
     */
    constructor(translateClient, renderer) {
        this.translateClient = translateClient;
        this.renderer = renderer;
    }

    /**
     * Координирует процесс перевода и отрисовки
     * @param {HTMLImageElement} imageElement 
     * @param {Object} ocrResult - Ответ от Yandex OCR
     */
    async translateAndRender(imageElement, ocrResult) {
        const blocks = ocrResult?.data?.blocks;
        if (!blocks || !Array.isArray(blocks)) {
            console.warn('[GlyphSwap] No text blocks found to translate.');
            return;
        }

        const textItemsToTranslate = [];

        blocks.forEach(block => {
            if (block.box && block.text) {
                textItemsToTranslate.push(block);
            } else if (block.boxes && Array.isArray(block.boxes)) {
                block.boxes.forEach(innerBox => {
                    if (innerBox.text) textItemsToTranslate.push(innerBox);
                });
            }
        });

        const originalTexts = textItemsToTranslate.map(item => item.text);

        console.log(`[GlyphSwap] Translating ${originalTexts.length} text fragments...`);
        const translatedTexts = await this.translateClient.translateBatch(originalTexts);

        textItemsToTranslate.forEach((item, index) => {
            item.translatedText = translatedTexts[index] || item.text;
        });

        this.renderer.render(imageElement, blocks);
    }
}