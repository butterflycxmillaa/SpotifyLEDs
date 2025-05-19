import { useEffect } from "react";
import { getCookie, removeCookie } from "../utils/CookieHandler.js";

function RedirectPage() {
    useEffect(() => {
        const redirect = getCookie('redirect')
        if(redirect) {
            removeCookie('redirect');
            window.location.href = (redirect);
        }
        else {
            window.location.href = `http://localhost:5174/error?error=${
                encodeURIComponent('Request timed out')
            }`
        }
    }, [])

    return <p>redirecting...</p>
}

export default RedirectPage;