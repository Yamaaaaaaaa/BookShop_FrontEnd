import React, { useState, useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import './Admin_Header.scss';

const Admin_Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleString('en-VN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-VN', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <header className="admin-header">
            <div className="admin-header__user">
                <div className="admin-header__user-avatar">
                    <span>N</span>
                </div>
                <div className="admin-header__user-info">
                    <span className="admin-header__user-name">Nisal Gunasekara</span>
                    <span className="admin-header__user-role">Admin</span>
                </div>
            </div>
            
            <div className="admin-header__actions">
                <div className="admin-header__datetime">
                    <span className="admin-header__time">{formatTime(currentTime)}</span>
                    <span className="admin-header__date">{formatDate(currentTime)}</span>
                </div>
                <button className="admin-header__settings">
                    <MdSettings size={24} />
                </button>
            </div>
        </header>
    );
};

export default Admin_Header;