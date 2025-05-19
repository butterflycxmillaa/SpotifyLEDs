import './App.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PublicRoute from "../routes/public/PublicRoute.jsx";
import ProtectedRoute from "../routes/protected/ProtectedRoute.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import PlaybackReader from "../routes/protected/PlaybackReader.jsx";

const router = createBrowserRouter([
    {
        path: "/redirect",
        element: <RedirectPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/error",
        element: <ErrorPage />
    },
    {
        path: "/public",
        element: <PublicRoute />,
        children: []
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <PlaybackReader />,
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])

function App() {
    try
    {
        return <RouterProvider router={router}></RouterProvider>
    }
    catch (error) {
        window.location.href = `http://localhost:5174/error?error=${error.message}`;
    }
}

export default App
