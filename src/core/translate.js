export async function translate(text, target = 'ru') {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`)
    }
    const data = await response.json()
    return data[0].map(item => item[0]).join('')
}