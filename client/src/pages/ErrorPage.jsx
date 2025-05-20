import { useEffect, useState } from "react";

function ErrorPage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setMessage(params.get('error'));
    }, [])

    return (<div className={"theme-dark"}>
        <h1>An error occurred</h1>
        <p><b>Info:</b> {message}</p>
    </div>)
}

export default ErrorPage