import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdCategory, 
  MdMenuBook, 
  MdGroup, 
  MdCollections, 
  MdLogout,
  MdPayment,
  MdExpandMore,
  MdExpandLess,
  MdLibraryBooks
} from 'react-icons/md';
import { FaMoneyBill } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { SiAffinitypublisher } from "react-icons/si";
import './Admin_SideBar.scss';
import { useAdmin } from "../../../../context/AdminContext";

const Admin_SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAdmin();
    
    // State for dropdown toggles
    const [contentOpen, setContentOpen] = useState(false);
    const [financialOpen, setFinancialOpen] = useState(false);
    
    // Check if current path is in a group to auto-expand that group
    useEffect(() => {
        const currentPath = location.pathname;
        
        if (['/admin/books', '/admin/categories', '/admin/series', '/admin/authors', '/admin/publishers'].includes(currentPath)) {
            setContentOpen(true);
        }
        
        if (['/admin/bills', '/admin/payment-method'].includes(currentPath)) {
            setFinancialOpen(true);
        }
    }, [location.pathname]);

    // Individual menu items
    const singleItems = [
        {
            title: 'Dashboard',
            icon: <MdDashboard size={20} />,
            path: '/admin/dashboard'
        },
        {
            title: 'Users',
            icon: <MdGroup size={20} />,
            path: '/admin/users'
        },
    ];
    
    // Content management group
    const contentItems = [
        {
            title: 'Books',
            icon: <MdMenuBook size={20} />,
            path: '/admin/books'
        },
        {
            title: 'Categories',
            icon: <MdCategory size={20} />,
            path: '/admin/categories'
        },
        {
            title: 'Series',
            icon: <MdCollections size={20} />,
            path: '/admin/series'
        },
        {
            title: 'Authors',
            icon: <FaUserEdit size={20} />,
            path: '/admin/authors'
        },
        {
            title: 'Publishers',
            icon: <SiAffinitypublisher size={20} />,
            path: '/admin/publishers'
        },
    ];
    
    // Financial management group
    const financialItems = [
        {
            title: 'Bills',
            icon: <FaMoneyBill size={20} />,
            path: '/admin/bills'
        },
        {
            title: 'Payment Method',
            icon: <MdPayment size={20} />,
            path: '/admin/payment-method'
        },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
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
                {/* Individual items */}
                {singleItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `admin-sidebar__item ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                ))}
                
                {/* Content Management Group */}
                <div className="admin-sidebar__group">
                    <button 
                        className="admin-sidebar__group-header"
                        onClick={() => setContentOpen(!contentOpen)}
                    >
                        <div className="admin-sidebar__group-title">
                            <MdLibraryBooks size={20} />
                            <span>Content</span>
                        </div>
                        {contentOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                    </button>
                    
                    {contentOpen && (
                        <div className="admin-sidebar__group-items">
                            {contentItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `admin-sidebar__item ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Financial Management Group */}
                <div className="admin-sidebar__group">
                    <button 
                        className="admin-sidebar__group-header"
                        onClick={() => setFinancialOpen(!financialOpen)}
                    >
                        <div className="admin-sidebar__group-title">
                            <FaMoneyBill size={20} />
                            <span>Financial</span>
                        </div>
                        {financialOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                    </button>
                    
                    {financialOpen && (
                        <div className="admin-sidebar__group-items">
                            {financialItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `admin-sidebar__item ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Logout Button */}
            <button className="admin-sidebar__logout" onClick={handleLogout}>
                <MdLogout size={20} />
                <span>Log Out</span>
            </button>
        </>
    );
};

export default Admin_SideBar;
