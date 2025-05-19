import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // If authenticated, render the children components
    return children
}

export default ProtectRoute