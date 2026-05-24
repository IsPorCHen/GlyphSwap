export class ImageOverlayRenderer {
    render(imageElement, blocks) {
        if (!blocks || !Array.isArray(blocks)) {
            console.warn('[GlyphSwap] No valid blocks provided to renderer.');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;
        ctx.drawImage(imageElement, 0, 0);

        ctx.strokeStyle = '#ff0044';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#ff0044';
        ctx.font = '16px Arial';

        const drawBox = (boxCoords, text) => {
            if (!boxCoords || !Array.isArray(boxCoords) || boxCoords.length < 8) return;

            const coords = boxCoords.map(Number);

            const x = Math.min(coords[0], coords[2], coords[4], coords[6]);
            const y = Math.min(coords[1], coords[3], coords[5], coords[7]);
            const width = Math.max(coords[0], coords[2], coords[4], coords[6]) - x;
            const height = Math.max(coords[1], coords[3], coords[5], coords[7]) - y;

            ctx.strokeRect(x, y, width, height);

            if (text) {
                const textY = y > 20 ? y - 5 : y + height + 16;
                ctx.fillText(text, x, textY);
            }
        };

        blocks.forEach(block => {
            if (block.box && block.text) {
                drawBox(block.box, block.text);
            } else if (block.boxes && Array.isArray(block.boxes)) {
                block.boxes.forEach(innerBox => {
                    drawBox(innerBox.box, innerBox.text);
                });
            }
        });

        imageElement.src = canvas.toDataURL('image/jpeg', 0.9);
    }
}