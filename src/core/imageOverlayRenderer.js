export class ImageOverlayRenderer {
    render(imageElement, blocks) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;
        ctx.drawImage(imageElement, 0, 0);

        const drawTranslatedBox = (boxCoords, text) => {
            if (!boxCoords || !Array.isArray(boxCoords) || boxCoords.length < 8 || !text) return;

            const coords = boxCoords.map(Number);
            const x = Math.min(coords[0], coords[2], coords[4], coords[6]);
            const y = Math.min(coords[1], coords[3], coords[5], coords[7]);
            const width = Math.max(coords[0], coords[2], coords[4], coords[6]) - x;
            const height = Math.max(coords[1], coords[3], coords[5], coords[7]) - y;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
            ctx.fillRect(x - 4, y - 4, width + 8, height + 8);

            const fontSize = Math.max(Math.round(height * 0.8), 14);
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(2, Math.round(fontSize / 8));
            ctx.strokeText(text, x, y);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x, y);
        };

        blocks.forEach(block => {
            if (block.box && block.translatedText) {
                drawTranslatedBox(block.box, block.translatedText);
            } else if (block.boxes && Array.isArray(block.boxes)) {
                block.boxes.forEach(innerBox => {
                    drawTranslatedBox(innerBox.box, innerBox.translatedText);
                });
            }
        });

        try {
            imageElement.src = canvas.toDataURL('image/jpeg', 0.95);
        } catch (e) {
            console.warn('[GlyphSwap] Tainted canvas. Swapping nodes...');
            canvas.className = imageElement.className;
            canvas.style.cssText = imageElement.style.cssText;

            if (!canvas.style.width) canvas.style.width = '100%';
            if (!canvas.style.height) canvas.style.height = 'auto';
            if (!canvas.style.maxWidth) canvas.style.maxWidth = '100%';
            canvas.style.objectFit = 'contain';

            if (imageElement.parentNode) {
                imageElement.parentNode.replaceChild(canvas, imageElement);
            }
        }
    }
}