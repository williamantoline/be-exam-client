import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/admin/dashboard";
import UserHome from "./components/pages/user/home/home";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/register";
import CategoryPage from "./components/pages/admin/category";
import BookPage from "./components/pages/admin/book";
import ProfilePage from "./components/pages/admin/profile";
import NotificationPage from "./components/pages/admin/notification";
import UserPage from "./components/pages/admin/user";
import BorrowingPage from "./components/pages/admin/borrowing";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path={"/login"} />
                <Route element={<Register />} path={"/register"} />
                <Route element={<UserHome />} path={""} />
                <Route path="/admin">
                    {/* <Route element={<Dashboard />} path={"dashboard"} /> */}
                    <Route element={<UserPage />} path={"users"} />
                    <Route element={<CategoryPage />} path={"categories"} />
                    <Route element={<BookPage />} path={"books"} />
                    <Route element={<BorrowingPage />} path={"borrowings"} />
                    <Route element={<NotificationPage />} path={"notifications"} />
                    <Route element={<ProfilePage />} path={"profile"} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

