import Tesseract from 'tesseract.js'

export async function recognize(url) {
    const { data } = await Tesseract.recognize(url, 'eng')
    return data.text
}