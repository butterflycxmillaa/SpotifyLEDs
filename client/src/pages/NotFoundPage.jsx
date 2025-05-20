import {Link} from "react-router-dom";

function NotFoundPage() {
    return (<div className={"theme-dark"}>
        <h1>404 Not Found</h1>
        <Link to={"/"}>Torna alla home</Link>
    </div>)
}

export default NotFoundPage;