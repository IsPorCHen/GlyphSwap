export class ImageOverlayRenderer {
    render(imageElement, blocks) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;
        ctx.drawImage(imageElement, 0, 0);

        const parseBoxCoords = (box) => {
            if (!box) return null;

            if (box.x !== undefined && box.y !== undefined && box.w !== undefined && box.h !== undefined) {
                return { x: box.x, y: box.y, width: box.w, height: box.h };
            }

            if (box.x !== undefined && box.y !== undefined && box.width !== undefined && box.height !== undefined) {
                return { x: box.x, y: box.y, width: box.width, height: box.height };
            }

            let coords = [];
            if (typeof box === 'string') coords = box.split(/[, ]+/).map(Number);
            else if (Array.isArray(box) && Array.isArray(box[0])) coords = box.flat().map(Number);
            else if (Array.isArray(box)) coords = box.map(Number);

            coords = coords.filter(n => !isNaN(n));

            if (coords.length >= 8) {
                return {
                    x: Math.min(coords[0], coords[2], coords[4], coords[6]),
                    y: Math.min(coords[1], coords[3], coords[5], coords[7]),
                    width: Math.max(coords[0], coords[2], coords[4], coords[6]) - Math.min(coords[0], coords[2], coords[4], coords[6]),
                    height: Math.max(coords[1], coords[3], coords[5], coords[7]) - Math.min(coords[1], coords[3], coords[5], coords[7])
                };
            }

            return null;
        };

        const drawTranslatedBox = (boxData, textData) => {
            const rect = parseBoxCoords(boxData);
            if (!rect || !textData) return;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(rect.x - 4, rect.y - 4, rect.width + 8, rect.height + 8);

            const fontSize = Math.max(Math.round(rect.height * 0.75), 14);
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(2, Math.round(fontSize / 8));
            ctx.strokeText(textData, rect.x, rect.y);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(textData, rect.x, rect.y);
        };

        if (Array.isArray(blocks)) {
            blocks.forEach(block => {
                if (block.boxes && Array.isArray(block.boxes)) {
                    block.boxes.forEach(inner => {
                        const text = inner.translatedText || inner.text;
                        const boxData = inner.box || inner.boundingBox || inner;
                        drawTranslatedBox(boxData, text);
                    });
                } else {
                    const text = block.translatedText || block.text;
                    const boxData = block.box || block.boundingBox || block;
                    drawTranslatedBox(boxData, text);
                }
            });
        }

        try {
            imageElement.src = canvas.toDataURL('image/jpeg', 0.95);
        } catch {
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