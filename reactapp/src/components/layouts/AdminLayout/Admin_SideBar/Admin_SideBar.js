import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdCategory, 
  MdMenuBook, 
  MdGroup, 
  MdCollections, 
  MdLogout 
} from 'react-icons/md';
import './Admin_SideBar.scss';
import { FaMoneyBill } from "react-icons/fa";

const Admin_SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <MdDashboard size={22} />,
            path: '/admin/dashboard'
        },
        {
            title: 'Bills',
            icon: <FaMoneyBill size={22} />,
            path: '/admin/bills'
        },
        {
            title: 'Books',
            icon: <MdMenuBook size={22} />,
            path: '/admin/books'
        },
        {
            title: 'Categories',
            icon: <MdCategory size={22} />,
            path: '/admin/categories'
        },
        {
            title: 'Series',
            icon: <MdCollections size={22} />,
            path: '/admin/series'
        },        
        {
            title: 'Users',
            icon: <MdGroup size={22} />,
            path: '/admin/users'
        },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            {/* Header */}
            <div className="admin-sidebar__header">
                <div className="admin-sidebar__brand">
                <h1>Bookland</h1>
                <p>Manage Page</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="admin-sidebar__nav">
                {menuItems.map((item) => (
                    <button
                        key={item.title}
                        className={`admin-sidebar__item ${location.pathname === item.path ? 'admin-sidebar__item--active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <button className="admin-sidebar__logout" onClick={handleLogout}>
                <MdLogout size={22} />
                <span>Log Out</span>
            </button>
        </>
    );
};

export default Admin_SideBar;