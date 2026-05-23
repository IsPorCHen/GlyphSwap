export async function translate(text) {
    const r = await fetch(
        'https://translate.argosopentech.com/translate',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                source: 'auto',
                target: 'ru'
            })
        }
    )

    return (await r.json()).translatedText
}