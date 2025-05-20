import { useEffect, useState } from "react";
import {setCookie} from "../utils/CookieHandler.js";

function LoginPage() {
    const [redirect, setRedirect] = useState(null);

    const loginWithSpotify = () => {
        setCookie('redirect', redirect, 10000)
        window.location.href = 'http://localhost:3000/login'
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectURL = params.get("redirect");
        const sessionId = params.get("sessionId");
        console.log(sessionId)
        if(sessionId) {
            setCookie('sessionId', sessionId, 3600);
            window.location.href = redirectURL;
        }
        setRedirect(redirectURL);
    }, []);

    return <div className={"theme-dark"}>
        <h1>Spotify LEDs</h1>
        {redirect !== null && <button className={"login-button" +
            " hover:text-black hover:border-2"}
                 onClick={loginWithSpotify}>
            Login with Spotify
        </button>}
    </div>
}

export default LoginPage;