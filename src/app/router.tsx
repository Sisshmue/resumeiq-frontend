import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Hompage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import AnalyseResumePage from "../features/resume/pages/AnalyseResumePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/analyze',
        element: <AnalyseResumePage />
    }
])