import Tesseract from 'tesseract.js'

export async function recognize(imageUrl) {
    const result = await Tesseract.recognize(
        imageUrl,
        'eng'
    )

    return result.data.text
}