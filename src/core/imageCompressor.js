export class ImageCompressor {
    /**
     * @param {number} maxSizeBytes - Maximum allowed file size in bytes (default: 1MB)
     */
    constructor(maxSizeBytes = 1048576) {
        this.maxSizeBytes = maxSizeBytes;
    }

    /**
     * Checks the blob size and compresses it if it exceeds the limit.
     * @param {Blob} imageBlob - Original image blob.
     * @returns {Promise<Blob>} Compressed (or original) image blob.
     */
    async compressIfNeeded(imageBlob) {
        if (imageBlob.size <= this.maxSizeBytes) {
            return imageBlob;
        }

        console.log(`[GlyphSwap] Image size (${imageBlob.size} bytes) exceeds limit. Compressing...`);
        return this.compressImage(imageBlob);
    }

    compressImage(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(blob);

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // We keep the original dimensions but use JPEG compression to reduce file size
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert to JPEG format with 0.8 quality ratio
                canvas.toBlob(
                    (compressedBlob) => {
                        if (compressedBlob) {
                            resolve(compressedBlob);
                        } else {
                            reject(new Error('Canvas toBlob returned null during compression.'));
                        }
                    },
                    'image/jpeg',
                    0.8
                );
            };

            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error('Failed to load image for compression.'));
            };

            img.src = objectUrl;
        });
    }
}