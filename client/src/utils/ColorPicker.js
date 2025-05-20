export const getColor = (r, g, b) => {
    return `rgb(${r}, ${g}, ${b})`
}

export const isLight = (r, g, b) => {
    return (r * 0.299 + g * 0.587 + b * 0.114) >= 128;
}

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
        console.log(length)
        while ((i += ratio * 4) < (length)) {
            ++count;
            r += data.data[i];
            g += data.data[i + 1];
            b += data.data[i + 2];
        }
        r = (r / count);
        g = (g / count);
        b = (b / count);
        console.log(r,g,b,count)
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