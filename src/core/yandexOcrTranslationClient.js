export class YandexOcrTranslationClient {
    /**
     * @param {string} targetLanguage - Two-letter language code (e.g., 'ru', 'en')
     */
    constructor(targetLanguage = 'ru') {
        this.targetLanguage = targetLanguage;
        this.apiUrl = 'https://translate.yandex.net/api/v1/tr.json/translateImage';
    }

    /**
     * Sends the image blob to Yandex Image Translation API.
     * @param {Blob} imageBlob - The raw image data to be translated.
     * @returns {Promise<Object>} A promise resolving to the API response containing text blocks and background.
     */
    async translateImage(imageBlob) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            // Yandex API expects the field name to be 'file'. The filename doesn't strictly matter.
            formData.append('file', imageBlob, 'image_to_translate.jpg');

            // 'srv=tr-image' is required by Yandex internal routing. 
            // 'lang=auto-ru' means auto-detect source language and translate to Russian.
            const url = `${this.apiUrl}?srv=tr-image&lang=auto-${this.targetLanguage}`;

            GM_xmlhttpRequest({
                method: 'POST',
                url: url,
                data: formData,
                onload: (response) => {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            const result = JSON.parse(response.responseText);
                            resolve(result);
                        } catch (parseError) {
                            reject(new Error(`Failed to parse Yandex API response: ${parseError.message}`));
                        }
                    } else {
                        reject(new Error(`Yandex API returned status ${response.status}: ${response.statusText}`));
                    }
                },
                onerror: (error) => {
                    reject(new Error(`Network error during translation request: ${error.error || 'Unknown network error'}`));
                },
                ontimeout: () => {
                    reject(new Error('Yandex API request timed out.'));
                }
            });
        });
    }
}