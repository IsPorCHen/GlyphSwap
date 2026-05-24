export class GoogleTranslateClient {
    constructor(targetLang = 'ru') {
        this.targetLang = targetLang;
        this.baseUrl = 'https://translate.googleapis.com/translate_a/single';
    }

    async translateBatch(textArray) {
        if (!textArray || textArray.length === 0) return [];

        const delimiter = " ||| ";
        const combinedText = textArray.join(delimiter);

        const url = `${this.baseUrl}?client=gtx&sl=auto&tl=${this.targetLang}&dt=t&q=${encodeURIComponent(combinedText)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP status ${response.status}`);

            const rawData = await response.json();

            let translatedCombined = rawData[0].map(item => item[0]).join('');

            return translatedCombined.split(delimiter).map(str => str.trim());
        } catch (error) {
            console.error('[GlyphSwap] Translation error:', error);
            return textArray;
        }
    }
}