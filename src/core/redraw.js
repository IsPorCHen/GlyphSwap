export function redrawImage(img, translatedText) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    ctx.drawImage(img, 0, 0)

    const padding = 20
    const boxHeight = 100

    ctx.fillStyle = 'white'
    ctx.fillRect(
        padding,
        padding,
        canvas.width - padding * 2,
        boxHeight
    )

    ctx.fillStyle = 'black'
    ctx.font = '32px sans-serif'
    ctx.fillText(
        translatedText,
        40,
        80
    )

    return canvas.toDataURL()
}