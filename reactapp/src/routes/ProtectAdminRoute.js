import { Navigate } from "react-router-dom"
import { useAdmin } from "../context/AdminContext"

const ProtectAdminRoute = ({ children }) => {
    const { isAuthenticated } = useAdmin();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    // If authenticated, render the children components
    return children
}

export default ProtectAdminRoute