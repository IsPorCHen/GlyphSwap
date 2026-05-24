export class YandexOcrClient {
    constructor() {
        this.apiUrl = 'https://translate.yandex.net/ocr/v1.1/recognize';
    }

    /**
     * Sends the image to Yandex strictly to extract text and its bounding boxes.
     * @param {Blob} imageBlob - The compressed image data.
     * @returns {Promise<Object>} JSON containing recognized text blocks and their coordinates.
     */
    async extractTextBlocks(imageBlob) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', imageBlob, 'ocr_image.jpg');

            // srv=tr-image is required for the request to be routed correctly inside Yandex
            const url = `${this.apiUrl}?srv=tr-image`;

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
                            reject(new Error(`Failed to parse Yandex OCR response: ${parseError.message}`));
                        }
                    } else {
                        reject(new Error(`Yandex OCR API returned status ${response.status}`));
                    }
                },
                onerror: (error) => reject(new Error('Network error during OCR request')),
                ontimeout: () => reject(new Error('Yandex OCR request timed out'))
            });
        });
    }
}