import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import About from "../home/About";
import Saved from "../components/Saved";
import Login from "../components/Login";
import Signup from "../components/Signup";

const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/home",
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
    },
    {
        path: "/register",
        element: <Signup/>
    }
]);

export default router;