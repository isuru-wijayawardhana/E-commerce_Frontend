import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import OTPInput from "../pages/OTPInput";
import ResetPassword from "../pages/ResetPassword";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verify-forgot-password-otp",
                element : <OTPInput/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "cart",
                element : <Cart/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "Cancel",
                element : <Cancel/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : 'order',
                element : <OrderPage/>
            },
            {
                path: "admin-panal",
                element: <AdminPanel/>,
                children : [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    },
                    {
                        path: "all-orders",
                        element: <AllOrder/>
                    }
                ]
            },

]
    }
])


export default router;