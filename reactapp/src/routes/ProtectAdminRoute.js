import { Navigate } from "react-router-dom"

const ProtectAdminRoute = ({ children }) => {
    // Check if user is authenticated via sessionStorage
    const isAuth = sessionStorage.getItem('admin') !== null

    // If not authenticated, redirect to login
    if (!isAuth) {
        return <Navigate to="/admin/login" replace />
    }

    // If authenticated, render the children components
    return children
}

export default ProtectAdminRoute