import { Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout"
import ProtectAdminRoute from "./ProtectAdminRoute"
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin"
import AdminDashBoard from "../pages/Admin/AdminDashBoard/AdminDashBoard"
import BooksManagement from "../pages/Admin/BooksManagement/BooksManagement"
import UserManagement from "../pages/Admin/UserManagement/UserManagement"
import SeriesManagement from "../pages/Admin/SeriesManagement/SeriesManagement"
import CategoriesManagement from "../pages/Admin/CategoriesManagement/CategoriesManagement"
import BillsManagement from "../pages/Admin/BillManagement/BillManagement"
import BillDetail from "../pages/Admin/BillManagement/BillDetail/BillDetail"
import AuthorManagement from "../pages/Admin/AuthorsManagement/AuthorsManagement"
import PublisherManagement from "../pages/Admin/PublisherMangement/PublisherManagement"
import PaymentMethodManagement from "../pages/Admin/PaymentMethod/PaymentMethodManagement"

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
                <Route path="authors" element={<AuthorManagement/>}/>
                <Route path="publishers" element={<PublisherManagement/>}/>
                <Route path="payment-method" element={<PaymentMethodManagement/>}/>
                <Route path="categories" element={<CategoriesManagement/>}/>
                <Route path="bills" element={<BillsManagement/>}/>
                <Route path="bills/:id" element={<BillDetail/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    )
}
export default AdminRoute