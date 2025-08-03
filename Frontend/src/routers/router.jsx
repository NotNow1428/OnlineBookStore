import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";

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
            path: "/shop",
            element: <div>Shop</div>   
        },
        {
            path: "/contact",
            element: <div>Contact</div>   
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
            path: "/checkout",
            element: <CheckoutPage />   
        },
        {
            path: "/cart",
            element: <CartPage />  
        }
    ]
    },
]);

export default router;