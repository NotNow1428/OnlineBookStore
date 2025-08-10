import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import OrderPage from "../pages/books/OrderPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Dashboard from "../pages/admin/Dashboard";
import ManageBook from "../pages/admin/ManageBook";
import AddBook from "../pages/admin/AddBooks";
import AddBooks from "../pages/admin/AddBooks";
import UpdateBook from "../pages/admin/UpdateBook";
import Products from "../components/Products";
import About from "../components/About";
import OrderDetails from "../pages/books/OrderDetails"
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/orders",
                element: <OrderPage />
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
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            },
            {
                path: "/orders/:id",
                element: <OrderDetails />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: "/dashboard",
        element: <AdminRoute>
            <AdminDashboard />
        </AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBooks /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBook /></AdminRoute>
            },
        ]
    }
]);

export default router;