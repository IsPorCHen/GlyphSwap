import { describe, it, expect } from 'vitest';
import { ImageCompressor } from '../src/core/imageCompressor';

describe('ImageCompressor', () => {
    it('не должен сжимать файл, если он меньше лимита', async () => {
        const compressor = new ImageCompressor(1024);
        const smallBlob = new Blob(['a'.repeat(500)]);

        const result = await compressor.compressIfNeeded(smallBlob);
        expect(result.size).toBe(500);
    });
});