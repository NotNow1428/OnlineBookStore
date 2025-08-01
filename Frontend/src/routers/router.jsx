import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";

const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children:[
        { 
            path: "/",
            element: <Home/>,
        },
        {
            path: "/cantact",
            element: <div>Cantact</div>   
        },
        {
            path: "/about",
            element: <div>About</div>   
        },
        {
            path: "/login",
            element: <Login />  
        },
        {
            path: "/register",
            element: <Register />   
        },
        {
            path: "/cart",
            element: <CartPage />  
        }
    ]
    },
]);

export default router;