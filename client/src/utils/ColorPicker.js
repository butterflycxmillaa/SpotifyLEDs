export const pickAverageColor = async (imageElem, ratio) => {
    const canvas = document.createElement('canvas');
    let w = canvas.width = imageElem.width;
    let h = canvas.height = imageElem.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageElem, 0, 0, w, h);
    let r = 0, g = 0, b = 0;
    let data, length;
    let i = -4, count = 0;
    try {
        data = ctx.getImageData(0, 0, w, h);
        length = data.data.length;
        while ((i += ratio * 4) < (length)) {
            ++count;
            r += data.data[i];
            g += data.data[i + 1];
            b += data.data[i + 2];
        }
        r = ~~(r / count);
        g = ~~(g / count);
        b = ~~(b / count);
    }
    catch (e) {
        console.log(e)
    }

    return {
        R: r,
        G: g,
        B: b,
    }
}