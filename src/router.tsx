import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/elements/sidebar";
import Dashboard from "./components/pages/admin/dashboard";
import UserHome from "./components/pages/auth/home/home";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/register";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path={"/login"} />
                <Route element={<Register />} path={"/register"} />
                <Route element={<UserHome />} path={"/home"} />
                <Route path="/dashboard">
                        <Route element={<Dashboard />} path={""} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

