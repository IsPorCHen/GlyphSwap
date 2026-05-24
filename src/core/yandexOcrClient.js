/* global GM_xmlhttpRequest */
export class YandexOcrClient {
    constructor() {
        this.apiUrl = 'https://translate.yandex.net/ocr/v1.1/recognize';
    }

    async extractTextBlocks(imageBlob) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', imageBlob, 'image.jpg');

            const url = `${this.apiUrl}?srv=tr-image&lang=en`;

            GM_xmlhttpRequest({
                method: 'POST',
                url: url,
                data: formData,
                headers: {
                    'Origin': 'https://translate.yandex.ru',
                    'Referer': 'https://translate.yandex.ru/'
                },
                onload: (response) => {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            const result = JSON.parse(response.responseText);
                            resolve(result);
                        } catch (e) {
                            reject(new Error(`Parse error: ${e.message}`));
                        }
                    } else {
                        console.error('[GlyphSwap] Yandex API error response:', response.responseText);
                        reject(new Error(`Yandex OCR returned status ${response.status}`));
                    }
                },
                onerror: (err) => reject(new Error('Network error')),
            });
        });
    }
}