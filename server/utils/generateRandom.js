const generateRandom = (length) => {
    const possibili = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let ris = ""
    for(let i = 0; i < length; i++) {
        ris += possibili[Math.floor(Math.random() * possibili.length)];
    }
    return ris
}

module.exports = { generateRandom }