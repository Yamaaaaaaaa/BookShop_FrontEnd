import { Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout"
import ProtectAdminRoute from "./ProtectAdminRoute"
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin"
import AdminDashBoard from "../pages/Admin/AdminDashBoard/AdminDashBoard"
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
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    )
}
export default AdminRoute