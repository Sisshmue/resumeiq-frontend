import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Hompage";
import RegisterPage from "../features/auth/pages/RegisterPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    }
])