export const getCookie = (name) => {
    let str = document.cookie;
    for(let cookiePair of str.trim().split('; ')) {
        if(cookiePair.split('=')[0] === name) {
            return cookiePair.split('=')[1];
        }
    }
    return null;
}

export const doesCookieExist = (name) => {
    return getCookie(name) !== null;
}

export const isCookie = (name, value) => {
    return getCookie(name) === value;
}

export const setCookie = (name, value, expiry) => {
    // expiry = durata in secondi
    document.cookie = `${name}=${value};path=/;max-age=${expiry}`;
    return getCookie(name);
}

export const editCookie = (name, newValue, expiry = 3600) => {
    if(getCookie(name) !== null) {
        // il cookie è già esistente
        setCookie(name, newValue, expiry);
        return true;
    }
    return false;
}

export const removeCookie = (name) => {
    setCookie(name, '', -1);
    return true;
}