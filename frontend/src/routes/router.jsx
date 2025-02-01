import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import About from "../home/About";
import Saved from "../components/Saved";
import Login from "../components/Login";

const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/saved",
                element: <Saved/>
            }
        ]  
    },
    {
        path: "/login",
        element: <Login/>
    }
]);

export default router;