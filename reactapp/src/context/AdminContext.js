import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kiểm tra localStorage khi component mount
        const storedAdmin = localStorage.getItem('admin_info');
        const storedToken = localStorage.getItem('admin_token');
        
        if (storedAdmin && storedToken) {
            setAdmin(JSON.parse(storedAdmin));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (adminData, accessToken) => {
        setAdmin(adminData);
        setToken(accessToken);
        localStorage.setItem('admin_info', JSON.stringify(adminData));
        localStorage.setItem('admin_token', accessToken);
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem('admin_info');
        localStorage.removeItem('admin_token');
    };

    const value = {
        admin,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AdminContext.Provider value={value}>
            {!loading && children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}; 