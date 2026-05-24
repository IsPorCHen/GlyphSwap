import { describe, it, expect, vi } from 'vitest';
import { YandexOcrClient } from '../src/core/yandexOcrClient';

describe('YandexOcrClient', () => {
    it('должен корректно обрабатывать успешный ответ API', async () => {
        global.GM_xmlhttpRequest = vi.fn((opts) => {
            opts.onload({
                status: 200,
                responseText: JSON.stringify({ data: { blocks: [] } })
            });
        });

        const client = new YandexOcrClient();
        const result = await client.extractTextBlocks(new Blob());

        expect(result).toHaveProperty('data');
        expect(GM_xmlhttpRequest).toHaveBeenCalled();
    });
});