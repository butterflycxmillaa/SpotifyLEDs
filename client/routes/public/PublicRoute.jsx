import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

function PublicRoute () {
    useLayoutEffect(() => {
        console.log("route pubblica")
    }, []);

    return <Outlet />
}

export default PublicRoute