/* global GM_xmlhttpRequest */
export class SecureImageFetcher {
    /**
     * Fetches an image via Tampermonkey API to bypass strict CORS policies.
     * @param {string} imageUrl - The absolute URL of the image.
     * @returns {Promise<Blob>} A promise that resolves with the image Blob.
     */
    async fetchAsBlob(imageUrl) {
        return new Promise((resolve, reject) => {
            // GM_xmlhttpRequest is injected by Tampermonkey/Vite
            GM_xmlhttpRequest({
                method: 'GET',
                url: imageUrl,
                responseType: 'blob',
                onload: (response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response.response);
                    } else {
                        reject(new Error(`Fetch failed with status ${response.status}: ${response.statusText}`));
                    }
                },
                onerror: (error) => {
                    reject(new Error(`Network error occurred while fetching image: ${error.error || 'Unknown error'}`));
                },
                ontimeout: () => {
                    reject(new Error('Image fetch request timed out.'));
                }
            });
        });
    }
}