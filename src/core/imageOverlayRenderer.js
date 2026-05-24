export class ImageOverlayRenderer {
    /**
     * @param {HTMLImageElement} imageElement - The original image on the page.
     * @param {Array} blocks - Text blocks from Yandex OCR.
     */
    render(imageElement, blocks) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;

        ctx.drawImage(imageElement, 0, 0);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        blocks.forEach(block => {
            const { box } = block;
            const x = Math.min(box[0], box[2], box[4], box[6]);
            const y = Math.min(box[1], box[3], box[5], box[7]);
            const width = Math.max(box[0], box[2], box[4], box[6]) - x;
            const height = Math.max(box[1], box[3], box[5], box[7]) - y;

            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = 'red';
            ctx.font = '16px sans-serif';
            ctx.fillText(block.text, x, y - 5);
        });

        imageElement.src = canvas.toDataURL('image/jpeg');
    }
}