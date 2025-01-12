import { Navigate } from "react-router-dom"

const ProtectRoute = ({ children }) => {
    // Check if user is authenticated via sessionStorage
    const isAuth = sessionStorage.getItem('user') !== null

    // If not authenticated, redirect to login
    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    // If authenticated, render the children components
    return children
}

export default ProtectRoute