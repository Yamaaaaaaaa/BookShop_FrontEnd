import { Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout"
import ProtectAdminRoute from "./ProtectAdminRoute"
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin"
import AdminDashBoard from "../pages/Admin/AdminDashBoard/AdminDashBoard"
import BooksManagement from "../pages/Admin/BooksManagement/BooksManagement"
import UserManagement from "../pages/Admin/UserManagement/UserManagement"
import SeriesManagement from "../pages/Admin/SeriesManagement/SeriesManagement"
import CategoriesManagement from "../pages/Admin/CategoriesManagement/CategoriesManagement"

const AdminRoute = () =>{
    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route
                path="/*"
                    element={
                    <ProtectAdminRoute>
                        <AdminLayout />
                    </ProtectAdminRoute>
                }
            >   
                <Route path="dashboard" element={<AdminDashBoard/>}/>
                <Route path="books" element={<BooksManagement/>}/>
                <Route path="users" element={<UserManagement/>}/>
                <Route path="series" element={<SeriesManagement/>}/>
                <Route path="categories" element={<CategoriesManagement/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    )
}
export default AdminRoute