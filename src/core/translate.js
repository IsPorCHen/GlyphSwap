const API_URL = 'https://translate.argosopentech.com/translate'

export async function translate(text, target = 'ru') {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            source: 'auto',
            target
        })
    })

    if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`)
    }

    const data = await response.json()
    return data.translatedText
}