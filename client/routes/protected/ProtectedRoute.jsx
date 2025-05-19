import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../../src/utils/CookieHandler.js";

function ProtectedRoute () {
    useEffect(() => {
        const sessionId = getCookie('sessionId');
        const redirect = window.location.href;
        if(sessionId == null || sessionId.length != 32) {
            window.location.href = (`http://localhost:3000/token?redirect=${
                encodeURIComponent(redirect)
            }`)
        }
    }, []);

    return <Outlet />
}

export default ProtectedRoute